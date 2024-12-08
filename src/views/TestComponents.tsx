import React from 'react';
import AlertComponent from '../components/AlertComponent';
import AvatarComponent from '../components/AvatarComponent';
import BoxComponent from '../components/BoxComponent';
import CardComponent from '../components/CardComponent';
import CheckboxComponent from '../components/CheckboxComponent';
import ContainerComponent from '../components/ContainerComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import DateTimePickerComponent from '../components/DateTimePickerComponent';
import FabComponent from '../components/FabComponent';
import GridComponent from '../components/GridComponent';
import IconButtonComponent from '../components/IconButtonComponent';
import SnackBarComponent from '../components/SnackBarComponent';
import SwitchComponent from '../components/SwitchComponent';
import TabComponent from '../components/TabComponent';
import TextFieldComponent from '../components/TextFieldComponent';
import TypographyComponent from '../components/TypographyComponent';

const TestComponents = () => {
  return (
    <div>
      <h1>Página de Teste de Componentes</h1>
      <div>
        {/* Alert Component */}
        <AlertComponent />
      </div>
      <div>
        {/* Avatar Component */}
        <AvatarComponent />
      </div>
      <div>
        {/* Box Component */}
        <BoxComponent />
      </div>
      <div>
        {/* Card Component */}
        <CardComponent />
      </div>
      <div>
        {/* Checkbox Component */}
        <CheckboxComponent />
      </div>
      <div>
        {/* Container Component */}
        <ContainerComponent />
      </div>
      <div>
        {/* DatePicker Component */}
        <DatePickerComponent />
      </div>
      <div>
        {/* DateTimePicker Component */}
        <DateTimePickerComponent />
      </div>
      <div>
        {/* Fab Component */}
        <FabComponent />
      </div>
      <div>
        {/* Grid Component */}
        <GridComponent />
      </div>
      <div>
        {/* IconButton Component */}
        <IconButtonComponent />
      </div>
      <div>
        {/* SnackBar Component */}
        <SnackBarComponent />
      </div>
      <div>
        {/* Switch Component */}
        <SwitchComponent />
      </div>
      <div>
        {/* Tab Component */}
        <TabComponent />
      </div>
      <div>
        {/* TextField Component */}
        <TextFieldComponent />
      </div>
      <div>
        {/* Typography Component */}
        <TypographyComponent />
      </div>
    </div>
  );
};

export default TestComponents;
