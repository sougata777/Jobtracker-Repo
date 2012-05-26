//
//   Copyright 2013 Sougata Sarkar
//
//   This file is part of Jobtracker.

//   Jobtracker is free software: you can redistribute it and/or modify it under the terms of the GNU General Public
//   License as published by the Free Software Foundation, either version 3 of the License, or (at your option) 
//   any later version.
//
//   JobTracker is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the
//   implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License 
//   for more details.
//
//   You should have received a copy of the GNU General Public License along with Jobtracker. If not, 
//   see http://www.gnu.org/licenses/.
//



Ext.define('jobtracker.view.jobsearchform', {
    itemId: 'searchForm',
    extend: 'Ext.container.Container',
    layout: { type: 'hbox' },
    width: 400,

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        return [{
            xtype: 'panel',
            title: 'Search Jobs',
            width: 400,
            frame: true,
            bodyPadding: 10,
            layout: {
                type: 'table',
                columns: 1
            },

            items:
            [
                {
                    xtype: 'container',
                    items:
                    [

                         {
                             xtype: 'combobox',
                             name: 'jobType',
                             itemId: 'jobType',
                             fieldLabel: 'Job Type',
                             triggerAction: 'all',
                             displayField: 'JobTypeName',
                             valueField: 'JobTypeID',
                             editable: false,
                             style: 'clear:left;float:left',
                             emptyText: 'Select Job Type',
                             enableKeyEvents: true,
                             listeners: {
                                 keydown: function (obj, e) {
                                     if (e.getCharCode() == e.BACKSPACE) {
                                         e.preventDefault();
                                     }
                                 }
                             }
                         },

                         {
                             xtype: 'button',
                             iconCls: 'searchButtonIcon',
                             text: 'Search',
                             margin: '0 10 10 10',
                             style: 'float:left',
                             handler: function () {
                                 var jobType = Ext.ComponentQuery.query('#jobType')[0].getValue();
                                 if (jobType != null && jobType != '')
                                     Ext.ComponentQuery.query('#searchForm')[0].fireEvent('searchJob', 'jobType', jobType);
                             }
                         },

                         {
                             xtype: 'combobox',
                             name: 'jobStatus',
                             itemId: 'jobStatus',
                             fieldLabel: 'Job Status',
                             triggerAction: 'all',
                             displayField: 'JobStatusName',
                             valueField: 'JobStatusID',
                             editable: false,
                             style: 'clear:left;float:left',
                             emptyText: 'Select Job Status',
                             enableKeyEvents: true,
                             listeners: {
                                 keydown: function (obj, e) {
                                     if (e.getCharCode() == e.BACKSPACE) {
                                         e.preventDefault();
                                     }
                                 }
                             }
                         },

                         {
                             xtype: 'button',
                             iconCls: 'searchButtonIcon',
                             text: 'Search',
                             margin: '0 10 10 10',
                             style: 'float:left',
                             handler: function () {
                                 var jobStatus = Ext.ComponentQuery.query('#jobStatus')[0].getValue();
                                 if (jobStatus != null && jobStatus != '')
                                     Ext.ComponentQuery.query('#searchForm')[0].fireEvent('searchJob', 'jobStatus', jobStatus);
                             }
                         },

                         {
                             xtype: 'textfield',
                             name: 'lastName',
                             itemId: 'lastName',
                             fieldLabel: 'Last Name',
                             style: 'clear:left;float:left',
                             allowBlank: true
                         },

                        {
                            xtype: 'button',
                            iconCls: 'searchButtonIcon',
                            text: 'Search',
                            margin: '0 10 10 10',
                            style: 'float:left',
                            handler: function () {
                                var lastName = Ext.ComponentQuery.query('#lastName')[0].getValue();
                                if (lastName != null && lastName != '')
                                    Ext.ComponentQuery.query('#searchForm')[0].fireEvent('searchJob', 'lastName', lastName);
                            }
                        },

                         {
                             xtype: 'textfield',
                             name: 'phoneNumber',
                             itemId: 'phoneNumber',
                             fieldLabel: 'Phone #',
                             style: 'clear:left;float:left',
                             allowBlank: true                          
                         },

                        {
                            xtype: 'button',
                            iconCls: 'searchButtonIcon',
                            text: 'Search',
                            margin: '0 10 10 10',
                            style: 'float:left',
                            handler: function () {
                                var phoneNumber = Ext.ComponentQuery.query('#phoneNumber')[0].getValue();
                                if (phoneNumber != null && phoneNumber != '')
                                    Ext.ComponentQuery.query('#searchForm')[0].fireEvent('searchJob', 'phoneNumber', phoneNumber);
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'jobNumber',
                            itemId: 'jobNumber',
                            fieldLabel: 'Job #',
                            style: 'clear:left;float:left',
                            allowBlank: true
                        },

                        {
                            xtype: 'button',
                            iconCls: 'searchButtonIcon',
                            text: 'Search',
                            margin: '0 10 10 10',
                            style: 'float:left',
                            handler: function () {
                                var jobNumber = Ext.ComponentQuery.query('#jobNumber')[0].getValue();
                                if (jobNumber != null && jobNumber != '')
                                    Ext.ComponentQuery.query('#searchForm')[0].fireEvent('searchJob', 'jobNumber', jobNumber);
                            }
                        },

                        {
                            xtype: 'textfield',
                            name: 'serialNumber',
                            itemId: 'serialNumber',
                            fieldLabel: 'Serial #',
                            style: 'clear:left;float:left',
                            allowBlank: true
                        },

                        {
                            xtype: 'button',
                            iconCls: 'searchButtonIcon',
                            text: 'Search',
                            margin: '0 10 10 10',
                            style: 'float:left',
                            handler: function () {
                                var serialNumber = Ext.ComponentQuery.query('#serialNumber')[0].getValue();
                                if (serialNumber != null && serialNumber != '')
                                    Ext.ComponentQuery.query('#searchForm')[0].fireEvent('searchJob', 'serialNumber', serialNumber);
                            }
                        },

                        {
                            xtype: 'datefield',
                            anchor: '100%',
                            style: 'clear:left;float:left',
                            fieldLabel: 'Install Date',
                            name: 'installDate',
                            itemId: 'installDate',
                            editable: false
                        },

                        {
                            xtype: 'button',
                            iconCls: 'searchButtonIcon',
                            text: 'Search',
                            margin: '0 10 10 10',
                            style: 'float:left',
                            handler: function () {
                                var installDate = Ext.ComponentQuery.query('#installDate')[0].getRawValue();
                                if (installDate != null && installDate != '')
                                    Ext.ComponentQuery.query('#searchForm')[0].fireEvent('searchJob', 'installDate', installDate);
                            }
                        },

                         {
                             xtype: 'textfield',
                             name: 'invoiceNumber',
                             itemId: 'invoiceNumber',
                             fieldLabel: 'Invoice #',
                             style: 'clear:left;float:left',
                             allowBlank: true
                         },

                         {
                             xtype: 'button',
                             iconCls: 'searchButtonIcon',
                             text: 'Search',
                             margin: '0 10 10 10',
                             style: 'float:left',
                             handler: function () {
                                 var invoiceNumber = Ext.ComponentQuery.query('#invoiceNumber')[0].getValue();
                                 if (invoiceNumber != null && invoiceNumber != '')
                                     Ext.ComponentQuery.query('#searchForm')[0].fireEvent('searchJob', 'invoiceNumber', invoiceNumber);
                             }
                         },

                         {
                             xtype: 'combobox',
                             name: 'paymentStatus',
                             itemId: 'paymentStatus',
                             fieldLabel: 'Payment Status',
                             triggerAction: 'all',
                             displayField: 'PaymentStatusName',
                             valueField: 'PaymentStatusID',
                             editable: false,
                             style: 'clear:left;float:left',
                             emptyText: 'Select Payment Status',
                             enableKeyEvents: true,
                             listeners: {
                                 keydown: function (obj, e) {
                                     if (e.getCharCode() == e.BACKSPACE) {
                                         e.preventDefault();
                                     }
                                 }
                             }
                         },

                         {
                             xtype: 'button',
                             iconCls: 'searchButtonIcon',
                             text: 'Search',
                             margin: '0 10 10 10',
                             style: 'float:left',
                             handler: function () {
                                 var paymentStatus = Ext.ComponentQuery.query('#paymentStatus')[0].getValue();
                                 if (paymentStatus != null && paymentStatus != '')
                                     Ext.ComponentQuery.query('#searchForm')[0].fireEvent('searchJob', 'paymentStatus', paymentStatus);
                             }
                         },

                          {
                              xtype: 'textfield',
                              name: 'itemNumber',
                              itemId: 'itemNumber',
                              fieldLabel: 'Item #',
                              style: 'clear:left;float:left',
                              allowBlank: true
                          },

                          {
                              xtype: 'button',
                              iconCls: 'searchButtonIcon',
                              text: 'Search',
                              margin: '0 10 10 10',
                              style: 'float:left',
                              handler: function () {
                                  var itemNumber = Ext.ComponentQuery.query('#itemNumber')[0].getValue();
                                  if (itemNumber != null && itemNumber != '')
                                      Ext.ComponentQuery.query('#searchForm')[0].fireEvent('searchJob', 'itemNumber', itemNumber);
                              }
                          }
                    ]
                }
            ]
        }]
    }
});
