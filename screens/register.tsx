import React, { FunctionComponent, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik';
import { registerUser } from '../services/userServices/register';
// Custom components
import MainContainer from '../components/containers/mainContainer';
import KeyboardAvoidingContainer from '../components/containers/keyboardAvoidingContainer';
import RegularText from '../components/texts/regularText';
import SmallText from '../components/texts/smallText';
import StyledTextInput from '../components/inputs/styledTextInputs';
import MessageBox from '../components/texts/messageBox';
import RegularButton from '../components/buttons/regularButton';
import { colors } from '../components/colors';
import StyledCheckBox from '../components/inputs/styledCheckBox';
import ConfirmModal from '../components/modals/confirmModal';
import MessageModal from '../components/modals/messageModal';


const Register: FunctionComponent = () => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Sig&Com', value: 'sig'},
    {label: 'Bâtiments', value: 'bat'},
    {label: "Agent d'Intervention", value: 'ai'},
    {label: 'Service à la clientèle', value: 'sc'},
    {label: 'Sûreté & Contrôle', value: 'sur'},
    {label: 'Salle de contrôle', value: 'pcc'},
    {label: 'Administration', value: 'adm'},
  ]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [type, setType] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [lowerMessage, setLowerMessage] = useState('');

  const messageModal = (modalType: string, modalHeader: string, modalLower: string) => {
    setType(modalType);
    setHeaderText(modalHeader);
    setLowerMessage(modalLower);
    setShowMessageModal(true);
  }

  const handleRegistration = (credentials: any, setSubmitting: any) => {
    setMessage('');
    if (value === null) {
      setShowConfirmModal(false);
      messageModal('failure', "Oupsi", "Choisissez un département pour l'employer");
      setSubmitting(false);
    } else {
      registerUser(credentials).then(result => {
        setShowConfirmModal(false);
        messageModal('success', "C'est bon.", "Utilisateur créé avec succès.");
        setSubmitting(false);
      }).catch(err => {
        if (err.message) {
          setShowConfirmModal(false);
          messageModal('failure', "Oupsi", err.message);
        }
        console.log(err);
        setSubmitting(false);
      });
    }
  }


  return (
    <MainContainer
      style={{paddingBottom: 0}}
    >
      <RegularText textStyle={{marginBottom: 25}}>
        Créer un compte pour GPMM Alertes
      </RegularText>
      <RegularText>
        Quel département?
      </RegularText>
      <View
        style={{zIndex: 10}}
      >
        <DropDownPicker
          placeholder='Choisissez le département.'
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          maxHeight={400}
          dropDownContainerStyle={{
            backgroundColor: colors.primary
          }}
          style={{
            backgroundColor: colors.primary
          }}
          containerStyle={{
            height: 70
          }}
          textStyle={{
            color: colors.tertiary,
            fontSize: 18
          }}
          listParentLabelStyle={{
            fontWeight: "bold"
          }}
          listChildContainerStyle={{
            paddingLeft: 20
          }}
          listItemContainerStyle={{
            height: 40
          }}
          theme="DARK"
          multiple={false}
          mode="BADGE"
          itemSeparator={true}
        />
      </View>
      <KeyboardAvoidingContainer>
        <Formik
          initialValues={{firstName: "", lastName: "", email: "", admin: false, role: ""}}
          onSubmit={(values, {setSubmitting}) => {
            if (values.firstName === "" || values.email === "" || values.role === "") {
              setMessage('Remplissez tout les champs.');
              setSubmitting(false);
            } else {
              handleRegistration({firstName: values.firstName, lastName: values.lastName, email: values.email.toLowerCase(), departement: value, role: values.role, admin: values.admin}, setSubmitting);
            }
          }}
        >
          {({handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue}) => (
            <>
              <StyledTextInput
                label="Rôle"
                icon="account"
                keyboardType="default"
                placeholder="Technicien"
                onChangeText={handleChange('role')}
                onBlur={handleBlur('role')}
                value={values.role}
                inputFieldStyle={{ marginBottom: 10 }}
              />
              <StyledTextInput
                label="Prénom"
                icon="account"
                keyboardType="default"
                placeholder="André"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                inputFieldStyle={{ marginBottom: 10 }}
              />
              <StyledTextInput
                label="Nom (optional)"
                icon="account"
                keyboardType="default"
                placeholder="Benoit"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                inputFieldStyle={{ marginBottom: 10 }}
              />
              <StyledTextInput
                label="Adresse courriel"
                icon="email-variant"
                keyboardType="email-address"
                placeholder="xyz@gpmmom.ca"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                inputFieldStyle={{ marginBottom: 20 }}
              />
              <StyledCheckBox
                isChecked={values.admin}
                setChecked={() => setFieldValue('admin', !values.admin)}
                name='admin rights'
                boxColor={colors.failure}
              >
                <SmallText>
                  Donner des droits d'administrateur?
                </SmallText>
              </StyledCheckBox>
              <MessageBox
                textStyle={{ marginBottom: 20, marginTop: 20 }}
              >
                { message || ' ' }
              </MessageBox>
              <ConfirmModal
                modalVisible={showConfirmModal}
                buttonHandler={handleSubmit}
                closeModal={() => 
                  setShowConfirmModal(false)
                }
                message='Êtes-vous sûre de vouloir donner des droits administrateur à cette utilisateur?'
              />
              {isSubmitting && <RegularButton>
                <ActivityIndicator
                  size="small"
                  color={colors.primary}
                />
              </RegularButton>}
              {!isSubmitting && <RegularButton
                onPress={values.admin ? () => setShowConfirmModal(true) : handleSubmit}
              >
                Créer Utilisateur
              </RegularButton>}
            </>
          )}
        </Formik>
      </KeyboardAvoidingContainer>
      <MessageModal
        buttonHandler={() => setShowMessageModal(false)}
        message={lowerMessage}
        headerText={headerText}
        type={type}
        buttonText='OK'
        modalVisible={showMessageModal}
      />
    </MainContainer>
  );
}

export default Register;