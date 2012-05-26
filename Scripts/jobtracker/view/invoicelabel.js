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


var defaultInvoiceLabelTpl = Ext.create('Ext.XTemplate',
'<tpl for=".">',
'<div class="invoiceLabelSelectBox">',
    '<div><span style="color:#000000">Invoice #:<b>{InvoiceNo}</b></span></div>',
'</div>',
'</tpl>',
{
    formatDate: function (value) {
        return Ext.Date.format(value, 'M j, Y');
    }
});

Ext.define('jobtracker.view.invoicelabel', {
    extend: 'Ext.container.Container',
    itemId: 'invoiceLabel',
    layout: { type: 'hbox' },
    border: false,
    style: 'border:none',

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        return [{
            xtype: 'container',
            border: false,
            style: 'border:none',
            items: [{
                autoScroll: true,
                border: false,
                style: 'border:none',
                itemId: 'invoiceLabelDataView',
                xtype: 'dataview',
                tpl: defaultInvoiceLabelTpl,
                itemSelector: 'div.invoiceLabelSelectBox'
            }]
        }]
    }
});

