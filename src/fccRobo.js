/* eslint-disable */
// const answers = require('./exampleAnswers.js');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const argv = require('yargs').argv;
let answers = {};

if (argv.answers) {
  answers = {...argv.answers};
}

const startNightmare = (answers) => {
  nightmare
    .goto('https://consumercomplaints.fcc.gov/hc/en-us/requests/new?ticket_form_id=39744')
    .type('#request_anonymous_requester_email', 'Just...')
    .type('#request_subject', 'One...')
    .type('#request_description', 'Moment...')
    .evaluate(function() {
      [...document.querySelectorAll('.nesty-input.ae-exclude')][1]
        .innerText = 'Unwanted Calls (including do not call and spoofing)';
    })
    .select('#ae-request_custom_fields_22619354', 'telemarketing_phone')
    .wait('#request_custom_fields_22625614')
    .wait('.nesty-input.ae-exclude')
    .evaluate(function(ans) {
      [...document.querySelectorAll('.nesty-input.ae-exclude')][9]
        .innerText = ans.isSoliciting;
      [...document.querySelectorAll('.nesty-input.ae-exclude')][13]
        .innerText = ans.phoneType;
      [...document.querySelectorAll('.nesty-input.ae-exclude')][14]
        .innerText = ans.phoneLocation;
      if (ans.isSoliciting === 'Yes') {
        return 'yes_telemarketing_services';
      } else {
        return 'no_telemarketing_services';
      }
    }, answers)
    .then(function(isSoliciting) {
      return nightmare
        .select('#ae-request_custom_fields_22625554', isSoliciting)
        .wait('#request_custom_fields_22659794')
        .evaluate(function(ans) {
          document.getElementById('request_anonymous_requester_email').value = ans.email;
          document.getElementById('request_subject').value = ans.subject;
          document.getElementById('request_description').value = ans.description;
          document.getElementById('request_custom_fields_22625614').value = ans.phone;
          document.getElementById('request_custom_fields_22732340').value = ans.time;
          document.getElementById('request_custom_fields_22591154datedate')
            .value = ans.date;
          document.getElementById('request_custom_fields_22664784').value = ans.addtlInfo;
          document.getElementById('request_custom_fields_22539594').value = ans.firstName;
          document.getElementById('request_custom_fields_22704720').value = ans.lastName;
          document.getElementById('request_custom_fields_22554824').value = ans.address;
          document.getElementById('request_custom_fields_22554844').value = ans.city;
          document.getElementById('request_custom_fields_22540124').value = ans.zipcode;
          document.getElementById('request_custom_fields_22615094').value = ans.phone;
          document.getElementById('request_custom_fields_22659924').value = ans.callerIdNumber;
          document.getElementById('request_custom_fields_22659794').value = ans.typeOfSolicit;
          if (ans.phoneType === 'Internet (VOIP)') {
            return 'internet_voip_phone';
          } else if (ans.phoneType === 'Wired') {
            return 'wired_phone';
          } else {
            return 'wireless_phone';
          }
        }, answers)
        .then(function(phoneType) {
          nightmare.select('#ae-request_custom_fields_22781220', phoneType)
            .evaluate(function(ans) {
              if (ans.phoneLocation === 'Residential/Personal') {
                return 'residential_personal_phone_type_location';
              } else if (ans.phoneLocation === 'Business (including government and nonprofit organizations)') {
                return 'business_type_location';
              } else if (ans.phoneLocation === 'Patient Room in Health Care or Elderly Care Facility') {
                return 'patient_room_type_location';
              } else {
                return 'toll_free_line_type_location';
              }
            }, answers)
            .then(function(location) {
              nightmare.select('#ae-request_custom_fields_22659804', location)
                .evaluate(function(ans) {
                  [...document.querySelectorAll('.nesty-input.ae-exclude')][10]
                    .innerText = ans.doneBusinessWith;
                  if (ans.doneBusinessWith === 'Yes') {
                    return 'yes_business_relationship_part_1';
                  } else if (ans.doneBusinessWith === 'No') {
                    return 'no_business_relationship_part_1';
                  } else {
                    return 'uncertain_business_relationship_part_1';
                  }
                }, answers)
                .then(function(value) {
                  nightmare.select('#ae-request_custom_fields_22787930', value)
                    .evaluate(function(ans) {
                      [...document.querySelectorAll('.nesty-input.ae-exclude')][11]
                        .innerText = ans.inquiredWith;
                      if (ans.inquiredWith === 'Yes') {
                        return 'yes_business_relationship_part_2';
                      } else if (ans.inquiredWith === 'No') {
                        return 'no_business_relationship_part_2';
                      } else {
                        return 'uncertain_business_relationship_part_2';
                      }
                    }, answers)
                    .then(function(value) {
                      nightmare.select('#ae-request_custom_fields_22787940', value)
                        .evaluate(function(ans) {
                          [...document.querySelectorAll('.nesty-input.ae-exclude')][12]
                            .innerText = ans.householdRelation;
                          if (ans.householdRelation === 'Yes') {
                            return 'yes_personal_relationship';
                          } else if (ans.householdRelation === 'No') {
                            return 'no_personal_relationship';
                          } else {
                            return 'uncertain_personal_relationship';
                          }
                        }, answers)
                        .then(function(householdRelation) {
                          nightmare.select('#ae-request_custom_fields_22629554', householdRelation)
                            .evaluate(function() {
                              [...document.querySelectorAll('.nesty-input.ae-exclude')][15]
                                .innerText = 'Yes';
                              return 'yes_do_not_call_list';
                            })
                            .then(function(value) {
                              nightmare.select('#ae-request_custom_fields_22787860', value)
                                .evaluate(function(ans) {
                                  [...document.querySelectorAll('.nesty-input.ae-exclude')][19]
                                    .innerText = ans.typeOfCall;
                                  if (ans.typeOfCall === 'Abandoned Calls') {
                                    return 'abandoned_calls_type_of_call_telemarketing';
                                  } else if (ans.typeOfCall === 'Live Voice') {
                                    return 'live_voice_type_of_call_telemarketing';
                                  } else if (ans.typeOfCall === 'Prerecorded Voice') {
                                    return 'prerecorded_voice_type_of_call_telemarketing';
                                  } else {
                                    return 'text_messaage_type_of_call_telemarketing';
                                  }
                                }, answers)
                                .then(function(value) {
                                  nightmare.select('#ae-request_custom_fields_22787840', value)
                                    .evaluate(function(ans) {
                                      [...document.querySelectorAll('.nesty-input.ae-exclude')][20]
                                        .innerText = ans.permissionToCall;
                                      if (ans.permissionToCall === 'Yes') {
                                        return 'yes_permission_to_call';
                                      } else if (ans.permissionToCall === 'No') {
                                        return 'no_permission_to_call';
                                      } else {
                                        return 'uncertain_permission_to_call';
                                      }
                                    }, answers)
                                    .then(function(value) {
                                      nightmare.select('#ae-request_custom_fields_22625574', value)
                                        .evaluate(function(ans) {
                                          if (ans.permissionToCall === 'Yes') {
                                            [...document.querySelectorAll('.nesty-input.ae-exclude')][21]
                                              .innerText = ans.writtenPermission;
                                            document.getElementById('request_custom_fields_22660054datedate')
                                              .value = ans.dateOfPermission;
                                            if (ans.writtenPermission === 'Yes') {
                                              return 'yes_permission_to_call_in_writing';
                                            } else {
                                              return 'no_permission_to_call_in_writing';
                                            }
                                          }
                                        }, answers)
                                        .then(function(value) {
                                          nightmare.select('#ae-request_custom_fields_22660084', 'no_permission_to_call_in_writing')
                                            .evaluate(function(ans) {
                                              [...document.querySelectorAll('.nesty-input.ae-exclude')][22]
                                                .innerText = ans.receivedCallerId;
                                              if (ans.receivedCallerId === 'Yes') {
                                                return 'yes_caller_id_information';
                                              } else if (ans.receivedCallerId === 'No') {
                                                return 'no_caller_id_information';
                                              } else if (ans.receivedCallerId === 'Don\'t have caller id') {
                                                return 'don_t_have_caller_id_information';
                                              } else {
                                                return 'uncertain_caller_id_information';
                                              }
                                            }, answers)
                                            .then(function(value) {
                                              nightmare.select('#ae-request_custom_fields_22787920', value)
                                                .wait('#request_custom_fields_22659864')
                                                .evaluate(function(ans) {
                                                  if (ans.receivedCallerId === 'Yes') {
                                                    document.getElementById('request_custom_fields_22659864')
                                                      .value = ans.callerIdNumber;
                                                    document.getElementById('request_custom_fields_22659874')
                                                      .value = ans.callerIdName;
                                                  }
                                                  [...document.querySelectorAll('.nesty-input.ae-exclude')][23]
                                                    .innerText = ans.receivedBusinessName;
                                                  if (ans.receivedBusinessName === 'Yes') {
                                                    return 'yes_advertiser_business_name_provided';
                                                  } else if (ans.receivedBusinessName === 'No') {
                                                    return 'no_advertiser_business_name_provided';
                                                  } else {
                                                    return 'uncertain_advertiser_business_name_provided';
                                                  }
                                                }, answers)
                                                .then(function(value) {
                                                  nightmare.select('#ae-request_custom_fields_22630454', value)
                                                    .evaluate(function(ans) {
                                                      if (ans.receivedBusinessName === 'Yes') {
                                                        [...document.querySelectorAll('.nesty-input.ae-exclude')][24]
                                                          .innerText = ans.nameAtBeginning;
                                                        document.getElementById('request_custom_fields_22659904')
                                                          .value = ans.providedAdvertiserName;
                                                        if (ans.nameAtBeginning === 'Yes') {
                                                          return { response: 'yes_business_name_provided_beginning', ans };
                                                        } else {
                                                          return { response: 'no_business_name_provided_beginning', ans };
                                                        }
                                                      }
                                                      return { ans };
                                                    }, answers)
                                                    .then(function(value) {
                                                      if (value.ans.receivedBusinessName === 'Yes') {
                                                        nightmare.select('#ae-request_custom_fields_22822490', value.response)
                                                          .evaluate(function(ans) {
                                                            [...document.querySelectorAll('.nesty-input.ae-exclude')][34]
                                                              .innerText = ans.state;
                                                            const state = ans.state.toLowerCase().split(' ').join('_');
                                                            return state;
                                                          }, answers)
                                                          .then(function(value) {
                                                            nightmare.select('#ae-request_custom_fields_22540114', value)
                                                              .evaluate(function(ans) {
                                                                [...document.querySelectorAll('.nesty-input.ae-exclude')][35]
                                                                  .innerText = 'No';
                                                                return 'no_filing_on_behalf';
                                                              }, answers)
                                                              .then(function(value) {
                                                                nightmare.select('#ae-request_custom_fields_22636844', value)
                                                                  .then(function() {
                                                                    console.log('nightmare over');
                                                                  })
                                                                  .catch(console.error);
                                                              });
                                                          })
                                                          .then(function() {
                                                            console.log('nightmare over');
                                                          })
                                                          .catch(console.error);
                                                      } else {
                                                        nightmare.evaluate(function(ans) {
                                                          [...document.querySelectorAll('.nesty-input.ae-exclude')][34]
                                                            .innerText = ans.state;
                                                          const state = ans.state.toLowerCase().split(' ').join('_');
                                                          return state;
                                                        }, answers)
                                                          .then(function(state) {
                                                            nightmare.select('#ae-request_custom_fields_22540114', state)
                                                              .evaluate(function(ans) {
                                                                [...document.querySelectorAll('.nesty-input.ae-exclude')][35]
                                                                  .innerText = 'No';
                                                                return 'no_filing_on_behalf';
                                                              }, answers)
                                                              .then(function(value) {
                                                                nightmare.select('#ae-request_custom_fields_22636844', value)
                                                                  .then(function() {
                                                                    console.log('nightmare over');
                                                                  })
                                                                  .catch(console.error);
                                                              });
                                                          })
                                                          .then(function() {
                                                            console.log('nightmare over');
                                                          })
                                                          .catch(console.error);
                                                      }
                                                    })
                                                    .then(function() {
                                                      console.log('nightmare over');
                                                    })
                                                    .catch(console.error);
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    })
    .catch(console.error);
}

startNightmare(answers);

module.exports = startNightmare;
