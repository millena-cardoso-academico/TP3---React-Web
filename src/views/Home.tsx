import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerComponent from '../components/ContainerComponent';
import GridComponent from '../components/GridComponent';
import CardComponent from '../components/CardComponent';
import TypographyComponent from '../components/TypographyComponent';
import IconButtonComponent from '../components/IconButtonComponent';
import CustomButton from '../components/CustomButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import BabyIcon from '@mui/icons-material/ChildFriendly';
import SleepIcon from '@mui/icons-material/Hotel';
import BreastfeedingIcon from '@mui/icons-material/FreeBreakfast';
import DiaperIcon from '@mui/icons-material/BabyChangingStation';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useAppContext } from '../Context';
import { HistoryItem } from '../types/HistoryItem';
import FraldaDetails from '../components/FraldaDetails';
import AmamentacaoDetails from '../components/AmamentacaoDetails';
import SonoDetails from '../components/SonoDetails';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  listHistoryItems,
  getBabyData,
} from '../services/database';

const Home: React.FC = () => {
  const [homeData, setHomeData] = useState<any>(null);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de itens por página
  const navigate = useNavigate();
  const theme = useTheme();
  const { showSnackMessage, translate } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const babyData = await getBabyData();

        if (!babyData) {
          setHomeData({
            childName: translate('baby'),
            childAgeInDays: 0,
            height: translate('height'),
            weight: translate('weight'),
          });
        } else {
          const babyDOB = babyData.baby_birthdate ? new Date(babyData.baby_birthdate) : null;
          const childAgeInDays = calculateAgeInDays(babyDOB);
          setHomeData({
            childName: babyData.baby_name || translate('baby'),
            childAgeInDays: childAgeInDays || 0,
            height: babyData.baby_height ? `${babyData.baby_height} cm` : translate('height'),
            weight: babyData.baby_weight ? `${babyData.baby_weight} kg` : translate('weight'),
          });
        }

        // Buscar histórico utilizando a função do database.js
        const fetchedHistoryData = await listHistoryItems();

        if (fetchedHistoryData) {
          setHistoryData(fetchedHistoryData);
          setCurrentPage(1);
        }
      } catch (err: any) {
        console.error('Erro ao buscar dados:', err);
        if (err.message.includes('Usuário não autenticado')) {
          showSnackMessage(translate('error_not_authenticated'));
          // Redirecionar para a página de login, por exemplo
          navigate('/login');
        } else {
          showSnackMessage(translate('unexpected_error'));
        }
      }
    };

    fetchData();
  }, [showSnackMessage, translate, navigate]);

  // Função para calcular a idade em dias
  const calculateAgeInDays = (dob: Date | null) => {
    if (!dob) return 0;
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - dob.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const categoryToSlug = (category: string) => {
    switch (category.toLowerCase()) {
      case 'sono':
        return 'sono';
      case 'amamentação':
      case 'amamentacao':
        return 'amamentacao';
      case 'fralda':
        return 'fralda';
      default:
        return category.toLowerCase();
    }
  };

  const handleAdd = (category: string) => {
    const categorySlug = categoryToSlug(category);
    navigate(`/form/${categorySlug}`);
  };

  const handleEdit = (item: HistoryItem) => {
    const categorySlug = categoryToSlug(item.category);
    navigate(`/form/${categorySlug}/${item.id}`);
  };

  const renderHistoryDetails = (item: HistoryItem) => {
    switch (item.category) {
      case 'fralda':
        return (
          <FraldaDetails
            date_time={item.date_time}
            diaper_type={item.diaper_type}
            notes={item.notes}
          />
        );
      case 'amamentacao':
        return (
          <AmamentacaoDetails
            date_time={item.date_time}
            type={item.type}
            duration={item.duration}
            notes={item.notes}
          />
        );
      case 'sono':
        return (
          <SonoDetails
            start_time={item.start_time}
            end_time={item.end_time}
            notes={item.notes}
          />
        );
      default:
        return null;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historyData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(historyData.length / itemsPerPage);

  return (
    <Box sx={{ backgroundColor: '#FFF0F5', minHeight: '100vh' }}>
      <ContainerComponent
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          paddingTop: '20px',
        }}
      >
        {/* Header */}
        <GridComponent container alignItems="center" justifyContent="space-between">
          {/* Botão de Dashboard */}
          <GridComponent item xs={4} sx={{ textAlign: 'center' }}>
            <IconButtonComponent
              onClick={() => handleNavigate('/dashboard')}
              sx={{
                backgroundColor: '#FFE4E1',
                '&:hover': { backgroundColor: '#FFC1C1' },
                color: '#FF69B4',
              }}
            >
              <DashboardIcon />
            </IconButtonComponent>
            <TypographyComponent sx={{ color: 'black' }}>
              {homeData?.height}
            </TypographyComponent>
          </GridComponent>

          {/* Informações da Criança */}
          <GridComponent item xs={4} sx={{ textAlign: 'center' }}>
            <BabyIcon sx={{ fontSize: 50, color: '#FF69B4' }} />
            <TypographyComponent variant="h6" sx={{ color: 'black' }}>
              {homeData?.childName}
            </TypographyComponent>
            <TypographyComponent sx={{ color: 'black' }}>
              {homeData?.childAgeInDays} {translate('days')}
            </TypographyComponent>
          </GridComponent>

          {/* Botão de Configurações */}
          <GridComponent item xs={4} sx={{ textAlign: 'center' }}>
            <IconButtonComponent
              onClick={() => handleNavigate('/settings')}
              sx={{
                backgroundColor: '#FFE4E1',
                '&:hover': { backgroundColor: '#FFC1C1' },
                color: '#FF69B4',
              }}
            >
              <SettingsIcon />
            </IconButtonComponent>
            <TypographyComponent sx={{ color: 'black' }}>
              {homeData?.weight}
            </TypographyComponent>
          </GridComponent>
        </GridComponent>

        {/* Boxes */}
        <GridComponent container spacing={2} sx={{ marginTop: '20px' }}>
          <GridComponent item xs={4}>
            <CardComponent
              sx={{
                backgroundColor: '#FFF8DC',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              <SleepIcon sx={{ fontSize: 40, color: '#FF69B4' }} />
              <TypographyComponent variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {translate('sleep')}
              </TypographyComponent>
              <CustomButton
                variant="contained"
                onClick={() => handleAdd('sono')}
                sx={{
                  marginTop: '10px',
                  backgroundColor: '#FFB6C1',
                  '&:hover': { backgroundColor: '#FF69B4' },
                }}
              >
                +
              </CustomButton>
            </CardComponent>
          </GridComponent>
          <GridComponent item xs={4}>
            <CardComponent
              sx={{
                backgroundColor: '#FFF8DC',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              <BreastfeedingIcon sx={{ fontSize: 40, color: '#FF69B4' }} />
              <TypographyComponent variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {translate('breastfeeding')}
              </TypographyComponent>
              <CustomButton
                variant="contained"
                onClick={() => handleAdd('amamentacao')}
                sx={{
                  marginTop: '10px',
                  backgroundColor: '#FFB6C1',
                  '&:hover': { backgroundColor: '#FF69B4' },
                }}
              >
                +
              </CustomButton>
            </CardComponent>
          </GridComponent>
          <GridComponent item xs={4}>
            <CardComponent
              sx={{
                backgroundColor: '#FFF8DC',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              <DiaperIcon sx={{ fontSize: 40, color: '#FF69B4' }} />
              <TypographyComponent variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {translate('diaper')}
              </TypographyComponent>
              <CustomButton
                variant="contained"
                onClick={() => handleAdd('fralda')}
                sx={{
                  marginTop: '10px',
                  backgroundColor: '#FFB6C1',
                  '&:hover': { backgroundColor: '#FF69B4' },
                }}
              >
                +
              </CustomButton>
            </CardComponent>
          </GridComponent>
        </GridComponent>

        {/* Histórico */}
        <TypographyComponent
          variant="h6"
          sx={{ marginTop: '30px', fontWeight: 'bold', color: 'black' }}
        >
          {translate('history')}
        </TypographyComponent>
        {historyData.length === 0 ? (
          <TypographyComponent variant="body2" sx={{ color: 'black', marginTop: '10px', marginBottom: '10px' }}>
            {translate('no_records_found')}
          </TypographyComponent>
        ) : (
          <>
            {currentItems.map((item) => (
              <CardComponent
                key={item.id}
                onClick={() => handleEdit(item)}
                sx={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  backgroundColor: '#f7eced',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                <TypographyComponent variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </TypographyComponent>
                {renderHistoryDetails(item)}
              </CardComponent>
            ))}

            {/* Controles de Paginação */}
            <Stack spacing={2} sx={{ alignItems: 'center', marginTop: '20px', paddingBottom: '20px' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
              />
            </Stack>
          </>
        )}
      </ContainerComponent>
    </Box>
  );
};

export default Home;
