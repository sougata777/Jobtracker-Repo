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


Ext.define('jobtracker.view.editjobform', {
    itemId: 'editJobForm',
    extend: 'Ext.container.Container',
    layout: { type: 'hbox' },
    width: 570,
    
    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },

     buildItems: function () {
        return [{
            xtype: 'panel',
            title: 'Edit Job',
            width: 570,
            frame: true,
            bodyPadding: 10,
            layout: {
                type: 'table',
                columns: 2
            },
            items:
                [
                    {
                        xtype: 'container',
                        items:
                            [
                                {
                                    xtype: 'hidden',
                                    name: 'ehJobID',
                                    itemId: 'ehJobID',
                                    value: ''
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'ejobNumber',
                                    itemId: 'ejobNumber',
                                    fieldLabel: 'Job #' + '<span style=\"color:black;\"> * </span>',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    blankText: 'Job # is required'
                                },

                                {
                                    xtype: 'combobox',
                                    name: 'ejobStatus',
                                    itemId: 'ejobStatus',
                                    fieldLabel: 'Job Status',
                                    triggerAction: 'all',
                                    displayField: 'JobStatusName',
                                    valueField: 'JobStatusID',
                                    editable: false,
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
                                    xtype: 'textfield',
                                    name: 'epoNumber',
                                    itemId: 'epoNumber',
                                    fieldLabel: 'PO #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'eserviceOrderNumber',
                                    itemId: 'eserviceOrderNumber',
                                    fieldLabel: 'Service Order #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'edispatchNumber',
                                    itemId: 'edispatchNumber',
                                    fieldLabel: 'Dispatch #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'eserialNumber',
                                    itemId: 'eserialNumber',
                                    fieldLabel: 'Serial #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'esalesCheckNumber',
                                    itemId: 'esalesCheckNumber',
                                    fieldLabel: 'Sales Check #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'eprojectNumber',
                                    itemId: 'eprojectNumber',
                                    fieldLabel: 'Project #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'Install Date',
                                    name: 'einstallDate',
                                    itemId: 'einstallDate',
                                    value: new Date(),
                                    editable: false
                                },

                                 {
                                     xtype: 'combobox',
                                     name: 'einstallFrom',
                                     itemId: 'einstallFrom',
                                     fieldLabel: 'Install From',
                                     triggerAction: 'all',
                                     displayField: 'IntervalName',
                                     valueField: 'IntervalID',
                                     editable: false,
                                     emptyText: 'Select From',
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
                                    xtype: 'combobox',
                                    name: 'einstallTo',
                                    itemId: 'einstallTo',
                                    fieldLabel: 'Install To',
                                    triggerAction: 'all',
                                    displayField: 'IntervalName',
                                    valueField: 'IntervalID',
                                    editable: false,
                                    emptyText: 'Select To',
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
                    },
                                                               
                    {
                        xtype: 'container',
                        margin: '0 0 0 40',
                        cellCls: 'x-table-layout-cell-top-align',
                        items:
                            [
                                {
                                    xtype: 'textareafield',
                                    grow: false,
                                    name: 'etechnicians',
                                    itemId: 'etechnicians',
                                    fieldLabel: 'Technicians',
                                    labelStyle: 'width:80px',
                                    enforceMaxLength: true,
                                    maxLength: 255,
                                    enableKeyEvents: true,
                                    listeners: {
                                        'keypress': {
                                            fn: function (field, event) {
                                                var val = field.getValue();
                                                if (event.keyCode != 8 && event.keyCode != 46) { //ignore backspace and delete
                                                    if (val.length >= 255) {
                                                        event.stopEvent();
                                                    }
                                                }
                                                return;
                                            }
                                            , scope: this
                                        }
                                    },
                                    anchor: '100%'
                                },

                                {
                                    xtype: 'textareafield',
                                    grow: false,
                                    name: 'enotes',
                                    itemId: 'enotes',
                                    fieldLabel: 'Notes',
                                    labelStyle: 'width:80px',
                                    enforceMaxLength: true,
                                    maxLength: 255,
                                    enableKeyEvents: true,
                                    listeners: {
                                        'keypress': {
                                            fn: function (field, event) {
                                                var val = field.getValue();
                                                if (event.keyCode != 8 && event.keyCode != 46) { //ignore backspace and delete
                                                    if (val.length >= 255) {
                                                        event.stopEvent();
                                                    }
                                                }
                                                return;
                                            }
                                            , scope: this
                                        }
                                    },
                                    anchor: '100%'
                                }
                            ]
                    },

                    {
                        xtype: 'container',
                        colspan: 2,
                        items:
                        [
                            {
                                xtype: 'button',
                                iconCls: 'defaultActionButtonIcon',
                                text: 'Update Job',
                                margin: '10 0 10 10',
                                style: 'float:left',
                                handler: function () {
                                    // validate job number
                                    var jobNumber = Ext.ComponentQuery.query('#ejobNumber')[0].getValue();
                                    if (jobNumber == null || jobNumber == '') return;

                                    // job status defaults to Not Completed if left empty
                                    var jobStatus = Ext.ComponentQuery.query('#ejobStatus')[0].getValue();
                                    jobStatus = (jobStatus == null || jobStatus == '') ? '41AC4AB0-9473-E111-8B2B-782BCB0CCADC' : jobStatus;

                                    // install times default to N/A if left empty
                                    var installFrom = Ext.ComponentQuery.query('#einstallFrom')[0].getValue();
                                    installFrom = (installFrom == null || installFrom == '') ? '-1' : installFrom;

                                    var installTo = Ext.ComponentQuery.query('#einstallTo')[0].getValue();
                                    installTo = (installTo == null || installTo == '') ? '-1' : installTo;

                                    Ext.ComponentQuery.query('#editJobForm')[0].fireEvent('updateJob',
                                            Ext.ComponentQuery.query('#ehJobID')[0].getValue(),
                                            Ext.ComponentQuery.query('#ejobNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#epoNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#edispatchNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#eserviceOrderNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#eserialNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#esalesCheckNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#eprojectNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#einstallDate')[0].getRawValue(),
                                            jobStatus,
                                            Ext.ComponentQuery.query('#etechnicians')[0].getValue(),
                                            Ext.ComponentQuery.query('#enotes')[0].getValue(),
                                            installFrom,
                                            installTo);
                                }
                            },

                            {
                                xtype: 'button',
                                iconCls: 'cancelButtonIcon',
                                itemId: 'cancelUpdateJobButton',
                                text: 'Cancel',
                                margin: '10 0 10 10',
                                style: 'float:left',
                                handler: function () {
                                    Ext.ComponentQuery.query('#editJobForm')[0].fireEvent('cancelUpdateJob');
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
        }]
    }
});