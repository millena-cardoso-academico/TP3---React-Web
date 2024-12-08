import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBarComponent from '../components/AppBarComponent';
import ContainerComponent from '../components/ContainerComponent';
import GridComponent from '../components/GridComponent';
import TypographyComponent from '../components/TypographyComponent';
import TextFieldComponent from '../components/TextFieldComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import CustomButton from '../components/CustomButton';
import TabComponent from '../components/TabComponent';
import BoxComponent from '../components/BoxComponent';
import { enUS, es, ptBR } from 'date-fns/locale';
import { Locale } from 'date-fns';

import { useAppContext } from '../Context';
import { SettingsData } from '../types/SettingsData';

import {
  getBabyData,
  upsertBabyData,
  signOutUser,
} from '../services/database';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { changeLanguage, language, showSnackMessage, translate } = useAppContext();

  const [settings, setSettings] = useState<SettingsData>({
    babyName: '',
    babyDOB: null,
    babyWeight: '',
    babyHeight: '',
  });

  const [unsavedSettings, setUnsavedSettings] = useState<SettingsData>(settings);

  useEffect(() => {
    const fetchBabyData = async () => {
      try {
        const babyData = await getBabyData();

        if (!babyData) {
          setSettings({
            babyName: '',
            babyDOB: null,
            babyWeight: '',
            babyHeight: '',
          });
          setUnsavedSettings({
            babyName: '',
            babyDOB: null,
            babyWeight: '',
            babyHeight: '',
          });
          return;
        }

        const parsedSettings: SettingsData = {
          babyName: babyData.baby_name || '',
          babyDOB: babyData.baby_birthdate ? new Date(babyData.baby_birthdate) : null,
          babyWeight: babyData.baby_weight || '',
          babyHeight: babyData.baby_height || '',
        };
        setSettings(parsedSettings);
        setUnsavedSettings(parsedSettings);
      } catch (err: any) {
        console.error('Erro ao buscar dados do bebê:', err);
        if (err.message.includes('Usuário não autenticado')) {
          showSnackMessage(translate('user_not_authenticated'));
          navigate('/signin');
        } else {
          showSnackMessage(translate('error_fetching_baby_data'));
        }
      }
    };

    fetchBabyData();
  }, [showSnackMessage, translate, navigate]);

  const handleUpdateUnsavedSettings = (newSettings: Partial<SettingsData>) => {
    setUnsavedSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  const handleSaveSettings = async () => {
    try {
      await upsertBabyData({
        baby_name: unsavedSettings.babyName,
        baby_birthdate: unsavedSettings.babyDOB ? unsavedSettings.babyDOB.toISOString() : null,
        baby_weight: unsavedSettings.babyWeight,
        baby_height: unsavedSettings.babyHeight,
      });

      setSettings(unsavedSettings);
      showSnackMessage(translate('settings_saved_successfully'));
    } catch (err: any) {
      console.error('Erro ao salvar configurações:', err);
      if (err.message.includes('Usuário não autenticado')) {
        showSnackMessage(translate('user_not_authenticated'));
        navigate('/signin');
      } else {
        showSnackMessage(translate('error_saving_baby_data'));
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      localStorage.removeItem('session');
      localStorage.removeItem('user');
      navigate('/signin');
    } catch (err: any) {
      console.error('Erro ao realizar logout:', err);
      showSnackMessage(translate('error_logging_out') + ': ' + err.message);
    }
  };

  const localeMap: { [key: string]: Locale } = {
    en: enUS,
    es: es,
    pt: ptBR,
  };

  const languageOptions = [
    { label: translate('portuguese'), value: 'pt' },
    { label: translate('english'), value: 'en' },
    { label: translate('spanish'), value: 'es' },
  ];

  return (
    <BoxComponent sx={{ backgroundColor: '#FFF0F5', minHeight: '100vh' }}>
      <AppBarComponent title={translate('settings')} />

      <ContainerComponent maxWidth="sm" sx={{ paddingTop: '20px' }}>
        {/* Seleção de Idioma */}
        <TypographyComponent
          variant="h6"
          sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'black' }}
        >
          {translate('language')}
        </TypographyComponent>
        <TabComponent
          value={language}
          onChange={(_event: React.SyntheticEvent, newValue: string) => {
            changeLanguage(newValue);
          }}
          tabs={languageOptions}
        />

        {/* Dados do Bebê */}
        <TypographyComponent
          variant="h6"
          sx={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: 'black' }}
        >
          {translate('baby_data')}
        </TypographyComponent>
        <GridComponent container spacing={2}>
          <GridComponent item xs={12}>
            <TextFieldComponent
              label={translate('baby_name')}
              value={unsavedSettings.babyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUnsavedSettings({ babyName: e.target.value })}
              fullWidth
            />
          </GridComponent>
          <GridComponent item xs={12}>
            <DatePickerComponent
              label={translate('baby_birthdate')}
              value={unsavedSettings.babyDOB}
              onChange={(date: Date | null) => handleUpdateUnsavedSettings({ babyDOB: date })}
              fullWidth
              locale={localeMap[language]}
            />
          </GridComponent>
          <GridComponent item xs={6}>
            <TextFieldComponent
              label={translate('baby_weight')}
              value={unsavedSettings.babyWeight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUnsavedSettings({ babyWeight: e.target.value })}
              fullWidth
            />
          </GridComponent>
          <GridComponent item xs={6}>
            <TextFieldComponent
              label={translate('baby_height')}
              value={unsavedSettings.babyHeight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUnsavedSettings({ babyHeight: e.target.value })}
              fullWidth
            />
          </GridComponent>
        </GridComponent>

        {/* Botão Salvar */}
        <CustomButton
          variant="contained"
          onClick={handleSaveSettings}
          sx={{
            marginTop: '30px',
            backgroundColor: '#FFB6C1',
            color: 'white',
            '&:hover': { backgroundColor: '#FF69B4' },
          }}
          fullWidth
        >
          {translate('save')}
        </CustomButton>

        {/* Botão Logout */}
        <CustomButton
          variant="contained"
          onClick={handleLogout}
          sx={{
            marginTop: '10px',
            backgroundColor: '#FFB6C1',
            color: 'white',
            '&:hover': { backgroundColor: '#FF69B4' },
          }}
          fullWidth
        >
          {translate('logout')}
        </CustomButton>
      </ContainerComponent>
    </BoxComponent>
  );
};

export default Settings;
