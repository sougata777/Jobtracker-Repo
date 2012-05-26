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



Ext.define('jobtracker.view.createinvoiceform', {
    itemId: 'createInvoiceForm',
    extend: 'Ext.container.Container',
    layout: { type: 'hbox' },
    width: 360,

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        return [{
            xtype: 'panel',
            title: 'Add a New Invoice',
            width: 360,
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
                            xtype: 'hidden',
                            name: 'hJobID',
                            itemId: 'hJobID',
                            value: ''
                        },

                        {
                            xtype: 'textfield',
                            name: 'invoiceNumber',
                            itemId: 'invoiceNumber',
                            fieldLabel: 'Invoice #' + '<span style=\"color:black;\"> * </span>',
                            allowBlank: false,
                            enforceMaxLength: true,
                            maxLength: 20,
                            blankText: 'Invoice # is required'
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
                            xtype: 'combobox',
                            name: 'paymentType',
                            itemId: 'paymentType',
                            fieldLabel: 'Payment Type',
                            triggerAction: 'all',
                            displayField: 'PaymentTypeName',
                            valueField: 'PaymentTypeID',
                            editable: false,
                            emptyText: 'Select Payment Type',
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
                            iconCls: 'defaultActionButtonIcon',
                            text: 'Add Invoice',
                            margin: '10 0 10 10',
                            style: 'float:left',
                            handler: function () {
                                // validate invoice number
                                var invoiceNumber = Ext.ComponentQuery.query('#invoiceNumber')[0].getValue();
                                if (invoiceNumber == null || invoiceNumber == '') return;

                                // payment status defaults to 'Not Paid' if left empty
                                // payment type defaults to 'N/A' if left empty
                                var paymentStatus = Ext.ComponentQuery.query('#paymentStatus')[0].getValue();
                                paymentStatus = (paymentStatus == null || paymentStatus == '') ? 'FE6E9D66-F655-E111-A7DB-782BCB0CCADC' : paymentStatus;
                                var paymentType = Ext.ComponentQuery.query('#paymentType')[0].getValue();
                                paymentType = (paymentType == null || paymentType == '') ? 'F22CCECE-F655-E111-A7DB-782BCB0CCADC' : paymentType;

                                Ext.ComponentQuery.query('#createInvoiceForm')[0].fireEvent('addInvoice',
                                    Ext.ComponentQuery.query('#hJobID')[0].getValue(),
                                    Ext.ComponentQuery.query('#invoiceNumber')[0].getValue(),
                                    paymentStatus,
                                    paymentType);
                            }
                        },

                        {
                            xtype: 'button',
                            iconCls: 'cancelButtonIcon',
                            itemId: 'cancelAddInvoiceButton',
                            text: 'Cancel',
                            margin: '10 0 10 10',
                            style: 'float:left',
                            handler: function () {
                                Ext.ComponentQuery.query('#createInvoiceForm')[0].fireEvent('cancelAddInvoice');
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
