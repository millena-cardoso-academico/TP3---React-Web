import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBarComponent from '../components/AppBarComponent';
import ContainerComponent from '../components/ContainerComponent';
import GridComponent from '../components/GridComponent';
import CardComponent from '../components/CardComponent';
import TypographyComponent from '../components/TypographyComponent';
import CustomButton from '../components/CustomButton';
import SleepIcon from '@mui/icons-material/Hotel';
import BreastfeedingIcon from '@mui/icons-material/FreeBreakfast';
import DiaperIcon from '@mui/icons-material/BabyChangingStation';
import { Box } from '@mui/material';
import { useAppContext } from '../Context';
import { HistoryItem } from '../types/HistoryItem';
import FraldaDetails from '../components/FraldaDetails';
import AmamentacaoDetails from '../components/AmamentacaoDetails';
import SonoDetails from '../components/SonoDetails';

import {
  getCountByCategory,
  getRecentActivities,
} from '../services/database';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>({
    totalFraldas: 0,
    totalAlimentacoes: 0,
    totalSono: 0,
    recentActivities: [] as HistoryItem[],
  });
  const navigate = useNavigate();
  const { showSnackMessage, translate } = useAppContext();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Obter contagens por categoria
        const totalFraldas = await getCountByCategory('fralda');
        const totalAlimentacoes = await getCountByCategory('amamentacao');
        const totalSono = await getCountByCategory('sono');

        // Obter atividades recentes
        const recentActivities = await getRecentActivities(5);

        // Atualizar o estado com os dados obtidos
        setDashboardData({
          totalFraldas,
          totalAlimentacoes,
          totalSono,
          recentActivities,
        });
      } catch (err: any) {
        console.error('Erro ao buscar dados da dashboard:', err);
        if (err.message.includes('Usuário não autenticado')) {
          showSnackMessage(translate('user_not_authenticated'));
          navigate('/signin');
        } else {
          showSnackMessage(translate('error_fetching_aggregated_data'));
        }
      }
    };

    fetchDashboardData();
  }, [showSnackMessage, translate, navigate]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleEdit = (item: HistoryItem) => {
    const categorySlug = categoryToSlug(item.category);
    navigate(`/form/${categorySlug}/${item.id}`);
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

  const renderRecentActivityDetails = (item: HistoryItem) => {
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

  return (
    <Box sx={{ backgroundColor: '#FFF0F5', minHeight: '100vh' }}>
      {/* AppBarComponent no topo */}
      <AppBarComponent title={translate('dashboard')} />

      {/* ContainerComponent seguindo o mesmo padrão da Home */}
      <ContainerComponent
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          paddingTop: '20px',
        }}
      >
        {/* Seção de Informações Resumidas */}
        <GridComponent container spacing={2}>
          {/* Card Template */}
          {[
            {
              icon: <DiaperIcon sx={{ fontSize: 40, color: '#FF69B4' }} />,
              title: translate('total_diapers'),
              value: dashboardData.totalFraldas,
            },
            {
              icon: <BreastfeedingIcon sx={{ fontSize: 40, color: '#FF69B4' }} />,
              title: translate('total_breastfeedings'),
              value: dashboardData.totalAlimentacoes,
            },
            {
              icon: <SleepIcon sx={{ fontSize: 40, color: '#FF69B4' }} />,
              title: translate('total_sleep'),
              value: dashboardData.totalSono,
            },
          ].map((card, index) => (
            <GridComponent key={index} item xs={12} sm={6} md={4}>
              <CardComponent
                sx={{
                  backgroundColor: '#FFF8DC',
                  textAlign: 'center',
                  padding: '20px',
                  height: '150px', // Define altura fixa
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 3,
                  borderRadius: '8px',
                }}
              >
                <Box>{card.icon}</Box>
                <TypographyComponent
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    marginTop: '10px',
                    wordBreak: 'break-word',
                    fontSize: '1rem',
                  }}
                >
                  {card.title}
                </TypographyComponent>
                <TypographyComponent
                  variant="h4"
                  sx={{
                    color: '#FF69B4',
                    marginTop: '5px',
                    wordBreak: 'break-word',
                    fontSize: '1.5rem',
                  }}
                >
                  {card.value}
                </TypographyComponent>
              </CardComponent>
            </GridComponent>
          ))}
        </GridComponent>

        {/* Seção de Atividades Recentes */}
        <Box sx={{ marginTop: '40px' }}>
          <TypographyComponent
            variant="h6"
            sx={{ fontWeight: 'bold', color: 'black', marginBottom: '20px' }}
          >
            {translate('recent_activities')}
          </TypographyComponent>
          {dashboardData.recentActivities.length === 0 ? (
            <TypographyComponent variant="body2" sx={{ color: 'black' }}>
              {translate('no_recent_activities')}
            </TypographyComponent>
          ) : (
            dashboardData.recentActivities.map((item) => (
              <CardComponent
                key={item.id}
                onClick={() => handleEdit(item)}
                sx={{
                  marginBottom: '15px',
                  backgroundColor: '#f7eced',
                  padding: '15px',
                  cursor: 'pointer',
                  boxShadow: 2,
                  borderRadius: '8px',
                }}
              >
                <GridComponent container alignItems="center" spacing={2}>
                  <GridComponent item>
                    {item.category === 'fralda' && <DiaperIcon sx={{ fontSize: 30, color: '#FF69B4' }} />}
                    {item.category === 'amamentacao' && <BreastfeedingIcon sx={{ fontSize: 30, color: '#FF69B4' }} />}
                    {item.category === 'sono' && <SleepIcon sx={{ fontSize: 30, color: '#FF69B4' }} />}
                  </GridComponent>
                  <GridComponent item xs>
                    <TypographyComponent variant="subtitle1" sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}>
                      {translate(item.category)}
                    </TypographyComponent>
                    <TypographyComponent variant="body2" sx={{ color: 'black', wordBreak: 'break-word' }}>
                      {new Date(item.created_at).toLocaleString()}
                    </TypographyComponent>
                  </GridComponent>
                </GridComponent>
                {renderRecentActivityDetails(item)}
              </CardComponent>
            ))
          )}
          {/* Botão para Ver Mais Atividades */}
          {dashboardData.recentActivities.length > 0 && (
            <CustomButton
              variant="contained"
              onClick={() => handleNavigate('/history')}
              sx={{
                marginTop: '20px',
                marginBottom: '20px',
                backgroundColor: '#FFB6C1',
                color: 'white',
                '&:hover': { backgroundColor: '#FF69B4' },
              }}
              fullWidth
            >
              {translate('view_all_activities')}
            </CustomButton>
          )}
        </Box>
      </ContainerComponent>
    </Box>
  );
};

export default Dashboard;
