import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {FORMS_LIST} from '../queries';

const HomeScreen = props => {
  const {data, error, loading} = useQuery(FORMS_LIST);
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      {data &&
        data.forms.map(form => (
          <TouchableOpacity
            key={form._id}
            style={styles.form}
            onPress={() => props.navigation.navigate('Form', {id: form._id})}>
            <Text style={styles.formTitle}>{form.title}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#f8f8ff',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 6,
    width: '90%',
    height: 52,
    backgroundColor: 'white',
    elevation: 3,
  },
  formTitle: {},
});

export default HomeScreen;
