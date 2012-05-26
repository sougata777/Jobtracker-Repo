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


Ext.define('jobtracker.view.editcustomerform', {
    itemId: 'editCustomerForm',
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
            itemId: 'editCustomerFormPanel',
            title: 'Edit Customer',
            frame: true,
            hidden: false,
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
                                xtype: 'hidden',
                                name: 'ehCustomerID',
                                itemId: 'ehCustomerID',
                                value: ''  
                            },
                            {
                                xtype: 'combobox',
                                style: 'margin-left: 10px',
                                name: 'ejobType',
                                itemId: 'ejobType',
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
                                name: 'efirstName',
                                itemId: 'efirstName',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'First Name',
                                enforceMaxLength: true,
                                maxLength: 30,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'elastName',
                                itemId: 'elastName',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'Last Name' + '<span style=\"color:black;\"> * </span>',
                                allowBlank: false,
                                enforceMaxLength: true,
                                maxLength: 30,
                                blankText: 'Last Name is required'
                            }, {
                                xtype: 'textfield',
                                name: 'ecompany',
                                itemId: 'ecompany',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'Company',
                                enforceMaxLength: true,
                                maxLength: 100,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'eaddress1',
                                itemId: 'eaddress1',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'Address 1',
                                enforceMaxLength: true,
                                maxLength: 50,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'eaddress2',
                                itemId: 'eaddress2',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'Address 2',
                                enforceMaxLength: true,
                                maxLength: 50,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'ecity',
                                itemId: 'ecity',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'City',
                                enforceMaxLength: true,
                                maxLength: 50,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'estate',
                                itemId: 'estate',
                                style: 'margin-left: 10px',
                                width: 300,
                                fieldLabel: 'State',
                                enforceMaxLength: true,
                                maxLength: 30,
                                allowBlank: true
                            }, {
                                xtype: 'textfield',
                                name: 'ezip',
                                itemId: 'ezip',
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
                                                        name: 'ephone1',
                                                        itemId: 'ephone1',
                                                        fieldLabel: 'Phone #',
                                                        labelAlign: 'top',
                                                        enforceMaxLength: true,
                                                        maxLength: 30,
                                                        maskRe: /[0-9a-zA-Z()-]/i,
                                                        allowBlank: true
                                                    }, {
                                                        xtype: 'textfield',
                                                        name: 'ephone2',
                                                        itemId: 'ephone2',
                                                        fieldLabel: 'Phone #',
                                                        labelAlign: 'top',
                                                        enforceMaxLength: true,
                                                        maxLength: 30,
                                                        maskRe: /[0-9a-zA-Z()-]/i,
                                                        allowBlank: true
                                                    }, {
                                                        xtype: 'textfield',
                                                        name: 'ephone3',
                                                        itemId: 'ephone3',
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
                                                        name: 'ephoneType1',
                                                        itemId: 'ephoneType1',
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
                                                        name: 'ephoneType2',
                                                        itemId: 'ephoneType2',
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
                                                        name: 'ephoneType3',
                                                        itemId: 'ephoneType3',
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
                                itemId: 'updateCustomerButton',
                                text: 'Update Customer',
                                margin: '10 0 10 10',
                                style: 'float:left',
                                handler: function () {
                                    // validate last name
                                    var lastName = Ext.ComponentQuery.query('#elastName')[0].getValue();
                                    if (lastName == null || lastName == '') return;

                                    // job type defaults to All Star Plumbing
                                    // address type defaults to 'Home'
                                    // phone type defaults to 'Home' if left blank
                                    var jobType = Ext.ComponentQuery.query('#ejobType')[0].getValue();
                                    var phoneType1 = Ext.ComponentQuery.query('#ephoneType1')[0].getValue();
                                    var phoneType2 = Ext.ComponentQuery.query('#ephoneType2')[0].getValue();
                                    var phoneType3 = Ext.ComponentQuery.query('#ephoneType3')[0].getValue();
                                    phoneType1 = (phoneType1 == null || phoneType1 == '') ? '1A8600EF-F255-E111-A7DB-782BCB0CCADC' : phoneType1;
                                    phoneType2 = (phoneType2 == null || phoneType2 == '') ? '1A8600EF-F255-E111-A7DB-782BCB0CCADC' : phoneType2;
                                    phoneType3 = (phoneType3 == null || phoneType3 == '') ? '1A8600EF-F255-E111-A7DB-782BCB0CCADC' : phoneType3;
                                    jobType = (jobType == null || jobType == '') ? '56488C2B-F855-E111-A7DB-782BCB0CCADC' : jobType;

                                    Ext.ComponentQuery.query('#editCustomerForm')[0].fireEvent('updateCustomer',
                                        Ext.ComponentQuery.query('#ehCustomerID')[0].getValue(),
                                        Ext.ComponentQuery.query('#efirstName')[0].getValue(),
                                        Ext.ComponentQuery.query('#elastName')[0].getValue(),
                                        Ext.ComponentQuery.query('#ecompany')[0].getValue(),
                                        Ext.ComponentQuery.query('#eaddress1')[0].getValue(),
                                        Ext.ComponentQuery.query('#eaddress2')[0].getValue(),
                                        Ext.ComponentQuery.query('#ecity')[0].getValue(),
                                        Ext.ComponentQuery.query('#estate')[0].getValue(),
                                        Ext.ComponentQuery.query('#ezip')[0].getValue(),
                                        '267A0B51-F455-E111-A7DB-782BCB0CCADC',
                                        Ext.ComponentQuery.query('#ephone1')[0].getValue(),
                                        Ext.ComponentQuery.query('#ephone2')[0].getValue(),
                                        Ext.ComponentQuery.query('#ephone3')[0].getValue(),
                                        phoneType1,
                                        phoneType2,
                                        phoneType3,
                                        jobType);
                                }
                            },

                            {
                                xtype: 'button',
                                iconCls: 'cancelButtonIcon',
                                itemId: 'cancelUpdateCustomerButton',
                                text: 'Cancel',
                                margin: '10 0 10 10',
                                style: 'float:left',
                                handler: function () {
                                    Ext.ComponentQuery.query('#editCustomerForm')[0].fireEvent('cancelUpdateCustomer');
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