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



Ext.define('jobtracker.view.edititemform', {
    itemId: 'editItemForm',
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
            title: 'Update Item',
            width: 360,
            frame: 'true',
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
                            name: 'ehItemID',
                            itemId: 'ehItemID',
                            value: ''
                        },

                        {
                            xtype: 'textfield',
                            name: 'eitemNumber',
                            itemId: 'eitemNumber',
                            fieldLabel: 'Item #' + '<span style=\"color:black;\"> * </span>',
                            allowBlank: false,
                            enforceMaxLength: true,
                            maxLength: 50,
                            blankText: 'Item # is required'
                        },

                        {
                            xtype: 'textfield',
                            name: 'esku',
                            itemId: 'esku',
                            fieldLabel: 'SKU',
                            enforceMaxLength: true,
                            maxLength: 20,
                            allowBlank: true
                        },

                        {
                            xtype: 'textareafield',
                            grow: false,
                            name: 'edescription',
                            itemId: 'edescription',
                            fieldLabel: 'Description',
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
                            xtype: 'numberfield',
                            name: 'eqty',
                            itemId: 'eqty',
                            fieldLabel: 'Qty',
                            minValue: 0,
                            maxValue: 99999999,
                            maxLength: 8,
                            enforceMaxLength: true,
                            allowBlank: true,
                            allowDecimals: false
                        },

                        {
                            xtype: 'numberfield',
                            name: 'eamount',
                            itemId: 'eamount',
                            minValue: 0,
                            maxValue: 99999999999.99,
                            maxLength: 11,
                            enforceMaxLength: true,
                            fieldLabel: 'Amount($)',
                            allowBlank: true
                        },
                                                                
                        {
                            xtype: 'button',
                            iconCls: 'defaultActionButtonIcon',
                            text: 'Update Item',
                            margin: '10 0 10 10',
                            style: 'float:left',
                            handler: function () {
                                // validate item number
                                var itemNumber = Ext.ComponentQuery.query('#eitemNumber')[0].getValue();
                                if (itemNumber == null || itemNumber == '') return;

                                // convert qty and amount to default values if blank
                                var qty = Ext.ComponentQuery.query('#eqty')[0].getValue();
                                qty = (qty == null || qty == '') ? '0' : qty;
                                var amount = Ext.ComponentQuery.query('#eamount')[0].getValue();
                                amount = (amount == null || amount == '') ? '0.0' : amount;

                                Ext.ComponentQuery.query('#editItemForm')[0].fireEvent('updateItem',
                                    Ext.ComponentQuery.query('#ehItemID')[0].getValue(),
                                    Ext.ComponentQuery.query('#eitemNumber')[0].getValue(),
                                    Ext.ComponentQuery.query('#esku')[0].getValue(),
                                    Ext.ComponentQuery.query('#edescription')[0].getValue(),
                                    qty,
                                    amount);
                            }
                        },

                        {
                            xtype: 'button',
                            iconCls: 'cancelButtonIcon',
                            itemId: 'cancelUpdateItemButton',
                            text: 'Cancel',
                            margin: '10 0 10 10',
                            style: 'float:left',
                            handler: function () {
                                Ext.ComponentQuery.query('#editItemForm')[0].fireEvent('cancelUpdateItem');
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
