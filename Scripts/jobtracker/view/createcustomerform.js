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


Ext.define('jobtracker.view.createcustomerform', {
    itemId: 'createCustomerForm',
    extend: 'Ext.container.Container',
    layout: { type: 'hbox' },
    width: 380,
    height: 570,

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        return [{
            xtype: 'panel',
            itemId: 'createCustomerFormPanel',
            waitMsgTarget:true,
            title: 'Create a New Customer',
            hidden: false,
            frame: true,
            width: 380,
            height: 570,
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
                                style: 'margin-left: 10px',
                                name: 'jobType',
                                itemId: 'jobType',
                                fieldLabel: 'Job Type',
                                triggerAction: 'all',
                                displayField: 'JobTypeName',
                                valueField: 'JobTypeID',
                                editable: false,
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
                                xtype: 'textfield',
                                name: 'firstName',
                                itemId: 'firstName',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'First Name',
                                enforceMaxLength: true,
                                maxLength: 30,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'lastName',
                                itemId: 'lastName',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'Last Name' + '<span style=\"color:black;\"> * </span>',
                                allowBlank: false,
                                enforceMaxLength: true,
                                maxLength: 30,
                                blankText: 'Last Name is required'
                            }, {
                                xtype: 'textfield',
                                name: 'company',
                                itemId: 'company',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'Company',
                                enforceMaxLength: true,
                                maxLength: 50,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'address1',
                                itemId: 'address1',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'Address 1',
                                enforceMaxLength: true,
                                maxLength: 50,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'address2',
                                itemId: 'address2',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'Address 2',
                                enforceMaxLength: true,
                                maxLength: 50,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'city',
                                itemId: 'city',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'City',
                                enforceMaxLength: true,
                                maxLength: 50,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'state',
                                itemId: 'state',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'State',
                                enforceMaxLength: true,
                                maxLength: 30,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'zip',
                                itemId: 'zip',
                                style: 'margin-left: 10px',
                                width: 200,
                                enforceMaxLength: true,
                                maxLength: 10,
                                fieldLabel: 'Zip',
                                maskRe: /\d/i,
                                allowBlank: true
                            },

                            {
                                xtype: 'fieldset',
                                style: 'margin-top:30px',
                                title: 'Phone Numbers',
                                collapsible: true,
                                defaultType: 'textfield',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%'
                                },
                                items:
                                [
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'table',
                                            columns: 2
                                        },
                                        margin: '10 0 0 10',

                                        items:
                                        [
                                            {
                                                xtype: 'container',
                                                items:
                                                [
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'phone1',
                                                        itemId: 'phone1',
                                                        fieldLabel: 'Phone #',
                                                        labelAlign: 'top',
                                                        enforceMaxLength: true,
                                                        maxLength: 30,
                                                        maskRe: /[0-9a-zA-Z()-]/i,
                                                        allowBlank: true
                                                    }, {
                                                        xtype: 'textfield',
                                                        name: 'phone2',
                                                        itemId: 'phone2',
                                                        fieldLabel: 'Phone #',
                                                        labelAlign: 'top',
                                                        enforceMaxLength: true,
                                                        maxLength: 30,
                                                        maskRe: /[0-9a-zA-Z()-]/i,
                                                        allowBlank: true
                                                    }, {
                                                        xtype: 'textfield',
                                                        name: 'phone3',
                                                        itemId: 'phone3',
                                                        fieldLabel: 'Phone #',
                                                        labelAlign: 'top',
                                                        enforceMaxLength: true,
                                                        maxLength: 30,
                                                        maskRe: /[0-9a-zA-Z()-]/i,
                                                        allowBlank: true
                                                    }
                                                ]
                                            },

                                            {
                                                xtype: 'container',
                                                cellCls: 'x-table-layout-cell-top-align',
                                                style: 'margin-top: 20px',
                                                items:
                                                [
                                                    {
                                                        xtype: 'combobox',
                                                        margin: '0 0 25 10',
                                                        name: 'phoneType1',
                                                        itemId: 'phoneType1',
                                                        fieldLabel: '',
                                                        triggerAction: 'all',
                                                        displayField: 'PhoneTypeName',
                                                        valueField: 'PhoneTypeID',
                                                        editable: false,
                                                        labelAlign: 'top',
                                                        emptyText: 'Select Phone Type',
                                                        enableKeyEvents: true,
                                                        listeners: {
                                                            keydown: function (obj, e) {
                                                                if (e.getCharCode() == e.BACKSPACE) {
                                                                    e.preventDefault();
                                                                }
                                                            }
                                                        }
                                                    }, {
                                                        xtype: 'combobox',
                                                        name: 'phoneType2',
                                                        itemId: 'phoneType2',
                                                        margin: '0 0 25 10',
                                                        fieldLabel: '',
                                                        triggerAction: 'all',
                                                        displayField: 'PhoneTypeName',
                                                        valueField: 'PhoneTypeID',
                                                        editable: false,
                                                        labelAlign: 'top',
                                                        emptyText: 'Select Phone Type',
                                                        enableKeyEvents: true,
                                                        listeners: {
                                                            keydown: function (obj, e) {
                                                                if (e.getCharCode() == e.BACKSPACE) {
                                                                    e.preventDefault();
                                                                }
                                                            }
                                                        }
                                                    }, {
                                                        xtype: 'combobox',
                                                        name: 'phoneType3',
                                                        itemId: 'phoneType3',
                                                        margin: '0 0 0 10',
                                                        fieldLabel: '',
                                                        triggerAction: 'all',
                                                        displayField: 'PhoneTypeName',
                                                        valueField: 'PhoneTypeID',
                                                        editable: false,
                                                        labelAlign: 'top',
                                                        emptyText: 'Select Phone Type',
                                                        enableKeyEvents: true,
                                                        listeners: {
                                                            keydown: function (obj, e) {
                                                                if (e.getCharCode() == e.BACKSPACE) {
                                                                    e.preventDefault();
                                                                }
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },

                            {
                                xtype: 'button',
                                iconCls: 'defaultActionButtonIcon',
                                itemId: 'createCustomerButton',
                                text: 'Create Customer',
                                margin: '10 0 10 10',
                                style: 'float:left',
                                handler: function () {
                                    // validate last name
                                    var lastName = Ext.ComponentQuery.query('#lastName')[0].getValue();
                                    if (lastName == null || lastName == '') return;

                                    // job type defaults to All Star Plumbing
                                    // address type defaults to 'Home'
                                    // phone type defaults to 'Home' if left blank
                                    var jobType = Ext.ComponentQuery.query('#jobType')[0].getValue();
                                    var phoneType1 = Ext.ComponentQuery.query('#phoneType1')[0].getValue();
                                    var phoneType2 = Ext.ComponentQuery.query('#phoneType2')[0].getValue();
                                    var phoneType3 = Ext.ComponentQuery.query('#phoneType3')[0].getValue();
                                    phoneType1 = (phoneType1 == null || phoneType1 == '') ? '1A8600EF-F255-E111-A7DB-782BCB0CCADC' : phoneType1;
                                    phoneType2 = (phoneType2 == null || phoneType2 == '') ? '1A8600EF-F255-E111-A7DB-782BCB0CCADC' : phoneType2;
                                    phoneType3 = (phoneType3 == null || phoneType3 == '') ? '1A8600EF-F255-E111-A7DB-782BCB0CCADC' : phoneType3;
                                    jobType = (jobType == null || jobType == '') ? '56488C2B-F855-E111-A7DB-782BCB0CCADC' : jobType;

                                    Ext.ComponentQuery.query('#createCustomerForm')[0].fireEvent('createCustomer',
                                        Ext.ComponentQuery.query('#firstName')[0].getValue(),
                                        Ext.ComponentQuery.query('#lastName')[0].getValue(),
                                        Ext.ComponentQuery.query('#company')[0].getValue(),
                                        Ext.ComponentQuery.query('#address1')[0].getValue(),
                                        Ext.ComponentQuery.query('#address2')[0].getValue(),
                                        Ext.ComponentQuery.query('#city')[0].getValue(),
                                        Ext.ComponentQuery.query('#state')[0].getValue(),
                                        Ext.ComponentQuery.query('#zip')[0].getValue(),
                                        '267A0B51-F455-E111-A7DB-782BCB0CCADC',
                                        Ext.ComponentQuery.query('#phone1')[0].getValue(),
                                        Ext.ComponentQuery.query('#phone2')[0].getValue(),
                                        Ext.ComponentQuery.query('#phone3')[0].getValue(),
                                        phoneType1,
                                        phoneType2,
                                        phoneType3,
                                        jobType);
                                }
                            },

                            {
                                xtype: 'button',
                                iconCls: 'cancelButtonIcon',
                                itemId: 'cancelNewCustomerButton',
                                text: 'Cancel',
                                margin: '10 0 10 10',
                                style: 'float:left',
                                handler: function () {
                                    Ext.ComponentQuery.query('#createCustomerForm')[0].fireEvent('cancelNewCustomer');
                                }
                            },

                            {
                                xtype: 'displayfield',
                                value: '* marks required fields',
                                style: 'clear:both'
                            }
                        ]
                    }
                ]
        }
        ]
    }
});