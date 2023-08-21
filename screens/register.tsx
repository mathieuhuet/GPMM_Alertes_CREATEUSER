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

const Register: FunctionComponent = () => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Sig&Com', value: 'sig'},
    {label: 'Bâtiments', value: 'bat'},
  ]);

  const handleRegistration = async (credentials: any, setSubmitting: any) => {
    setMessage('');
    if (value === null) {
      setMessage("Choisissez le département et le rôle de l'utilisateur.")
      setSubmitting(false);
    } else {
      // call backend and move to next page if successful
      registerUser(credentials).then(result => {
        setMessage('Utilisateur créer avec succès.')
        setSubmitting(false);
      }).catch(err => {
        if (err.message) {
          setMessage(err.message);
        }
        console.log(err);
        setSubmitting(false);
      });
    }
  }
  return (
    <MainContainer>
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
              {isSubmitting && <RegularButton>
                <ActivityIndicator
                  size="small"
                  color={colors.primary}
                />
              </RegularButton>}
              {!isSubmitting && <RegularButton
                onPress={handleSubmit}
              >
                Créer Utilisateur
              </RegularButton>}
            </>
          )}
        </Formik>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default Register;