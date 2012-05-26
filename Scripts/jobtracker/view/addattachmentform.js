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


Ext.define('jobtracker.view.addattachmentform', {
    itemId: 'addAttachmentForm',
    extend: 'Ext.container.Container',
    layout: { type: 'hbox' },
    width: 400,
    height: 200,
    bodyPadding: 10,

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        return
        [{
            xtype: 'panel',
            itemId: 'addAttachmentFormPanel',
            hidden: false,
            width: 400,
            height: 200,
            title: 'Attach a Work Order',
            layout: { type: 'hbox' },
            items: 
            [{
                xtype: 'textfield',
                name: 'phone1',
                itemId: 'phone1',
                fieldLabel: 'Phone #',
                labelAlign: 'top',
                enforceMaxLength: true,
                maxLength: 50,
                allowBlank: true
            }]
        }]
    }
});