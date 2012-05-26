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


Ext.define('jobtracker.view.createjobform', {
    itemId: 'createJobForm',
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
            title: 'Create a New Job',
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
                                    name: 'hCustomerID',
                                    itemId: 'hCustomerID',
                                    value: ''
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'jobNumber',
                                    itemId: 'jobNumber',
                                    fieldLabel: 'Job #' + '<span style=\"color:black;\"> * </span>',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    blankText: 'Job # is required'
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
                                    name: 'PONumber',
                                    itemId: 'PONumber',
                                    fieldLabel: 'PO #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'serviceOrderNumber',
                                    itemId: 'serviceOrderNumber',
                                    fieldLabel: 'Service Order #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'dispatchNumber',
                                    itemId: 'dispatchNumber',
                                    fieldLabel: 'Dispatch #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'serialNumber',
                                    itemId: 'serialNumber',
                                    fieldLabel: 'Serial #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'salesCheckNumber',
                                    itemId: 'salesCheckNumber',
                                    fieldLabel: 'Sales Check #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'projectNumber',
                                    itemId: 'projectNumber',
                                    fieldLabel: 'Project #',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    allowBlank: true
                                },

                                {
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'Install Date',
                                    name: 'installDate',
                                    itemId: 'installDate',
                                    value: new Date(),
                                    editable: false
                                },

                                {
                                    xtype: 'combobox',
                                    name: 'installFrom',
                                    itemId: 'installFrom',
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
                                    name: 'installTo',
                                    itemId: 'installTo',
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
                                    name: 'technician',
                                    itemId: 'technician',
                                    fieldLabel: 'Technicians',
                                    labelStyle: 'width:80px',
                                    enforceMaxLength: true,
                                    maxLength: 255,
                                    enableKeyEvents:true,
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
                                    name: 'notes',
                                    itemId: 'notes',
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
                                    text: 'Create Job',
                                    margin: '10 0 10 10',
                                    style: 'float:left',
                                    handler: function () {
                                        // validate job number
                                        var jobNumber = Ext.ComponentQuery.query('#jobNumber')[0].getValue();
                                        if (jobNumber == null || jobNumber == '') return;

                                        // job status defaults to Not Completed if left empty
                                        var jobStatus = Ext.ComponentQuery.query('#jobStatus')[0].getValue();
                                        jobStatus = (jobStatus == null || jobStatus == '') ? '41AC4AB0-9473-E111-8B2B-782BCB0CCADC' : jobStatus;

                                        // install times default to N/A if left empty
                                        var installFrom = Ext.ComponentQuery.query('#installFrom')[0].getValue();
                                        installFrom = (installFrom == null || installFrom == '') ? '-1' : installFrom;

                                        var installTo = Ext.ComponentQuery.query('#installTo')[0].getValue();
                                        installTo = (installTo == null || installTo == '') ? '-1' : installTo;

                                        Ext.ComponentQuery.query('#createJobForm')[0].fireEvent('createJob',
                                            Ext.ComponentQuery.query('#hCustomerID')[0].getValue(),
                                            Ext.ComponentQuery.query('#jobNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#PONumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#dispatchNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#serviceOrderNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#serialNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#salesCheckNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#projectNumber')[0].getValue(),
                                            Ext.ComponentQuery.query('#installDate')[0].getRawValue(),
                                            jobStatus,
                                            Ext.ComponentQuery.query('#technician')[0].getValue(),
                                            Ext.ComponentQuery.query('#notes')[0].getValue(),
                                            installFrom,
                                            installTo);
                                    }
                                },

                                 {
                                     xtype: 'button',
                                     iconCls: 'cancelButtonIcon',
                                     itemId: 'cancelNewJobButton',
                                     text: 'Cancel',
                                     margin: '10 0 10 10',
                                     style: 'float:left',
                                     handler: function () {
                                         Ext.ComponentQuery.query('#createJobForm')[0].fireEvent('cancelNewJob');
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
