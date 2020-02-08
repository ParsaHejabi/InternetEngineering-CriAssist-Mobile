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
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',

    alignItems: 'center',
    borderRadius: 10,
    width: '42%',
    aspectRatio: 1,
    backgroundColor: 'red',
  },
});

export default HomeScreen;
