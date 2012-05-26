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


var defaultItemListTpl = Ext.create('Ext.XTemplate',
    '<tpl for=".">',
    '<div class="itemSelectBox" onclick="EditItem(\'{ItemID}\');return false;" onmouseover="HighlightThis(this);" onmouseout="UnhighlightThis(this);">',
        '<div>Item #: <span style="color:#2e408c"><b>{ItemNo}</b></span></div>',
        '<div style="width:200px;clear:both;float:left">Status: {Qty}</div><div style="clear:both;float:left">Paid by: {Amount}</div>',
        '<div style="margin-top:50px"><u>Delete this invoice</u></div>',
    '</div></tpl>',
    {
        formatDate: function (value) {
            return Ext.Date.format(value, 'M j, Y');
    }
});


Ext.define('jobtracker.view.itemlist', {
    extend: 'Ext.container.Container', 
    itemId: 'itemList',
    layout: { type: 'hbox' },
    width: 340,
    height: 400,

     initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        return [{
            xtype: 'panel',
            title: 'Invoices',
            autoScroll: true,
            width: 340,
            height: 400,
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
                                    autoScroll: true,
                                    xtype: 'dataview',
                                    width: 320,
                                    tpl: defaultItemListTpl,
                                    itemSelector: 'div.itemSelectBox'
                                }
                            ]
                    }
                ]
        }]
    }
});