import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {FORM_DATA, SUBMIT_FORM} from '../queries';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const {height} = Dimensions.get('window');

const FormScreen = ({navigation, route}) => {
  const {id} = route.params;
  const {data, error, loading} = useQuery(FORM_DATA, {
    fetchPolicy: 'no-cache',
    variables: {
      id,
    },
  });
  const [CreateFormAnswer] = useMutation(SUBMIT_FORM);
  const [values, setValues] = useState({});
  const [visibles, setVisibles] = useState({});
  useEffect(() => {
    if (data) {
      console.log(data);
      const val = {};
      const vis = {};
      data.form.fields.forEach(element => {
        val[element.name] = '';
        if (['Texts', 'Dates', 'Numbers', 'Locations'].includes(element.type)) {
          vis[element.name] = false;
        }
      });
      setValues(val);
      setVisibles(vis);
    }
  }, [data]);

  const changeValue = useCallback(
    (name, value) => {
      const v = {...values};
      v[name] = value;
      setValues(v);
    },
    [values],
  );

  const toggleModal = useCallback(
    name => {
      const v = {...visibles};
      v[name] = !v[name];
      setVisibles(v);
    },
    [visibles],
  );

  const renderInput = useCallback(
    item => {
      switch (item.type) {
        case 'Number':
        case 'Text':
          return (
            <TextInput
              keyboardType={
                item.type === 'Number' ? 'decimal-pad' : 'ascii-capable'
              }
              value={values[item.name]}
              onChangeText={text => changeValue(item.name, text)}
              key={item._id}
              placeholder={item.title}
              style={{
                marginVertical: 8,
                fontSize: 17,
                width: '90%',
                height: 52,
                borderRadius: 6,
                overflow: 'hidden',
                justifyContent: 'center',
                paddingHorizontal: 8,
                borderWidth: 1,
              }}
            />
          );
        case 'Texts':
          return (
            <>
              <Modal
                isVisible={visibles[item.name]}
                style={{justifyContent: 'flex-end', margin: 0}}>
                <View
                  style={{
                    width: '100%',
                    height: height / 2,
                    paddingVertical: '8%',
                    backgroundColor: 'white',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginBottom: 10,
                      textTransform: 'capitalize',
                    }}>
                    {item.title}
                  </Text>
                  <ScrollView style={{width: '100%'}}>
                    {item.options.map(option => (
                      <TouchableOpacity
                        onPress={() => {
                          changeValue(item.name, option.value.textValue);
                          toggleModal(item.name);
                        }}
                        style={{
                          height: 52,
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                        }}>
                        <Text>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </Modal>
              <TouchableOpacity
                key={item._id}
                onPress={() => toggleModal(item.name)}
                style={{
                  marginVertical: 8,
                  width: '90%',
                  height: 52,
                  borderRadius: 6,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                  borderWidth: 1,
                }}>
                <Text style={{fontSize: 16}}>
                  {values[item.name] ? values[item.name] : item.name}
                </Text>
              </TouchableOpacity>
            </>
          );
        case 'Numbers':
          return (
            <>
              <Modal
                isVisible={visibles[item.name]}
                style={{justifyContent: 'flex-end', margin: 0}}>
                <View
                  style={{
                    width: '100%',
                    height: height / 2,
                    paddingVertical: '8%',
                    backgroundColor: 'white',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginBottom: 10,
                      textTransform: 'capitalize',
                    }}>
                    {item.title}
                  </Text>
                  <ScrollView style={{width: '100%'}}>
                    {item.options.map(option => (
                      <TouchableOpacity
                        onPress={() => {
                          changeValue(item.name, option.value.numberValue);
                          toggleModal(item.name);
                        }}
                        style={{
                          height: 52,
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                        }}>
                        <Text>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </Modal>
              <TouchableOpacity
                key={item._id}
                onPress={() => toggleModal(item.name)}
                style={{
                  marginVertical: 8,
                  width: '90%',
                  height: 52,
                  borderRadius: 6,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                  borderWidth: 1,
                }}>
                <Text style={{fontSize: 16}}>
                  {values[item.name] ? values[item.name] : item.name}
                </Text>
              </TouchableOpacity>
            </>
          );
        case 'Locations':
          return (
            <>
              <Modal
                isVisible={visibles[item.name]}
                style={{justifyContent: 'flex-end', margin: 0}}>
                <View
                  style={{
                    width: '100%',
                    height: height / 2,
                    backgroundColor: 'white',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginBottom: 10,
                      textTransform: 'capitalize',
                    }}>
                    {item.title}
                  </Text>
                  <ScrollView
                    style={{
                      backgroundColor: 'white',
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {item.options.map(option => (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={{margin: 10}}
                        onPress={() => {
                          changeValue(item.name, option.value.pointValue);
                          toggleModal(item.name);
                        }}>
                        <MapView
                          style={{height: 150, width: 150}}
                          initialRegion={{
                            latitude: option.value.pointValue.lat,
                            longitude: option.value.pointValue.long,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </Modal>
              <TouchableOpacity
                key={item._id}
                onPress={() => toggleModal(item.name)}
                style={{
                  marginVertical: 8,
                  width: '90%',
                  height: 52,
                  borderRadius: 6,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                  borderWidth: 1,
                }}>
                <Text style={{fontSize: 16}}>{item.name}</Text>
              </TouchableOpacity>
            </>
          );
        case 'Date':
          return (
            <DatePicker
              key={item._id}
              style={{width: '90%', marginVertical: 12}}
              date={values[item.name]}
              mode="datetime"
              placeholder={item.title}
              format="YYYY-MM-DD-HH-MM"
              minDate="2016-05-01"
              maxDate="2026-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  display: 'none',
                },
                dateInput: {
                  height: 52,
                  borderRadius: 6,
                  borderColor: 'black',
                },
              }}
              onDateChange={newDate => {
                const splitedDate = newDate.split('-');
                const date = new Date(
                  splitedDate[0],
                  splitedDate[1],
                  splitedDate[2],
                  splitedDate[3],
                  splitedDate[4],
                );
                console.log(date.toISOString());
                changeValue(item.name, date.toISOString());
              }}
            />
          );
        case 'Dates':
          return (
            <>
              <Modal
                isVisible={visibles[item.name]}
                style={{justifyContent: 'flex-end', margin: 0}}>
                <View
                  style={{
                    width: '100%',
                    height: height / 2,
                    paddingVertical: '8%',
                    backgroundColor: 'white',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginBottom: 10,
                      textTransform: 'capitalize',
                    }}>
                    {item.title}
                  </Text>
                  <ScrollView style={{width: '100%'}}>
                    {item.options.map(option => (
                      <TouchableOpacity
                        onPress={() => {
                          changeValue(item.name, option.value.dateValue);
                          toggleModal(item.name);
                        }}
                        style={{
                          height: 52,
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                        }}>
                        <Text>
                          {option.label + ':' + ' ' + option.value.dateValue}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </Modal>
              <TouchableOpacity
                key={item._id}
                onPress={() => toggleModal(item.name)}
                style={{
                  marginVertical: 8,
                  width: '90%',
                  height: 52,
                  borderRadius: 6,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                  borderWidth: 1,
                }}>
                <Text style={{fontSize: 16}}>
                  {values[item.name] ? values[item.name] : item.name}
                </Text>
              </TouchableOpacity>
            </>
          );
        case 'Location':
          return (
            <>
              <Modal
                isVisible={visibles[item.name]}
                style={{justifyContent: 'flex-end', margin: 0}}>
                <View
                  style={{
                    width: '100%',
                    height: height / 2,
                    backgroundColor: 'white',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    alignItems: 'center',
                  }}>
                  <MapView
                    onPress={e => {
                      changeValue(item.name, {
                        coordinate: e.nativeEvent.coordinate,
                      });
                    }}
                    onRegionChangeComplete={({latitude, longitude}) =>
                      changeValue(item.name, {lat: latitude, long: longitude})
                    }
                    provider={PROVIDER_GOOGLE}
                    style={{flex: 1, width: '100%'}}
                    initialRegion={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: height / 4 - 26,
                      height: 15,
                      width: 15,
                      borderRadius: 15,
                      backgroundColor: 'red',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => toggleModal(item.name)}
                    style={{
                      marginVertical: 8,
                      width: '100%',
                      height: 52,
                      backgroundColor: '#3467df',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                      }}>
                      Choose
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              <TouchableOpacity
                key={item._id}
                onPress={() => toggleModal(item.name)}
                style={{
                  width: '90%',
                  height: 52,
                  borderRadius: 6,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                  borderWidth: 1,
                }}>
                <Text style={{fontSize: 16}}>{item.name}</Text>
              </TouchableOpacity>
            </>
          );
      }
    },
    [changeValue, toggleModal, values, visibles],
  );
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
      }}>
      {data && data.form.fields.map(renderInput)}
      <TouchableOpacity
        onPress={() => {
          let validated = true;
          data.form.fields.forEach(field => {
            if (field.required && values[field.name] === '') {
              validated = false;
            }
          });
          if (validated) {
            CreateFormAnswer({
              fetchPolicy: 'no-cache',
              variables: {
                formId: id,
                value: values,
              },
            });
            navigation.goBack();
          }
        }}
        style={{
          marginTop: 30,
          height: 52,
          width: '90%',
          borderRadius: 6,
          backgroundColor: '#3467df',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormScreen;
