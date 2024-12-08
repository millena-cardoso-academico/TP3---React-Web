import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppBarComponent from '../components/AppBarComponent';
import DiaperForm from '../components/Diaper';
import SleepForm from '../components/Sleep';
import EatForm from '../components/Eat';
import ContainerComponent from '../components/ContainerComponent';
import CustomButton from '../components/CustomButton';
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useAppContext } from '../Context';
import { HistoryItem } from '../types/HistoryItem';

import { 
  getHistoryItemById, 
  insertHistoryItem, 
  updateHistoryItem, 
  deleteHistoryItem 
} from '../services/database';

interface FormParams {
  category: string;
  id?: string;
}

const Form: React.FC = () => {
  const { category, id } = useParams<FormParams>();
  const navigate = useNavigate();
  const { showSnackMessage, translate } = useAppContext();

  const [formData, setFormData] = useState<any>({ category });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const item = await getHistoryItemById(id);
          if (item) {
            setFormData(item);
          } else {
            alert(translate('no_records_found'));
            navigate('/');
          }
        } catch (error) {
          console.error('Erro ao buscar item:', error);
          alert(translate('unexpected_error'));
          navigate('/');
        }
      }
    };
    fetchData();
  }, [category, id, navigate, translate]);

  const handleUpdateFormData = (newData: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleSave = async () => {
    try {
      if (id) {
        await updateHistoryItem(id, formData);
      } else {
        await insertHistoryItem(formData);
      }
      showSnackMessage(translate('save'));
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      alert(translate('unexpected_error'));
    }
  };

  const handleDelete = async () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteHistoryItem(id!);
      showSnackMessage(translate('delete'));
      navigate('/');
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      alert(translate('unexpected_error'));
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const getCategoryName = (categorySlug: string) => {
    switch (categorySlug) {
      case 'fralda':
        return translate('diaper');
      case 'sono':
        return translate('sleep');
      case 'amamentacao':
        return translate('breastfeeding');
      default:
        return translate('invalid_category');
    }
  };

  const { translate: translateContext } = useAppContext();

  const categoryName = getCategoryName(category);

  const renderFormComponent = () => {
    switch (category) {
      case 'fralda':
        return (
          <DiaperForm formData={formData} onUpdate={handleUpdateFormData} />
        );
      case 'sono':
        return (
          <SleepForm formData={formData} onUpdate={handleUpdateFormData} />
        );
      case 'amamentacao':
        return (
          <EatForm formData={formData} onUpdate={handleUpdateFormData} />
        );
      default:
        return <div>{translateContext('invalid_category')}</div>;
    }
  };

  return (
    <Box sx={{ backgroundColor: '#FFF0F5', minHeight: '100vh' }}>
      <AppBarComponent
        title={
          id 
            ? `${translateContext('edit_category').replace('{categoryName}', categoryName)}`
            : `${translateContext('new_category').replace('{categoryName}', categoryName)}`
        }
        showDeleteIcon={!!id}
        onDelete={handleDelete}
      />
      <ContainerComponent maxWidth="sm" sx={{ paddingTop: '20px' }}>
        {renderFormComponent()}
        {/* Botão Salvar */}
        <CustomButton
          variant="contained"
          onClick={handleSave}
          sx={{
            marginTop: '30px',
            backgroundColor: '#FFB6C1',
            color: 'white',
            '&:hover': { backgroundColor: '#FF69B4' },
          }}
          fullWidth
        >
          {translateContext('save')}
        </CustomButton>
      </ContainerComponent>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{translateContext('confirm_delete_title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {translateContext('confirm_delete_message')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            {translateContext('cancel')}
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            {translateContext('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Form;
