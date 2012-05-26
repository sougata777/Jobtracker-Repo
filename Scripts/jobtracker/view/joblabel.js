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


var defaultJobLabelTpl = Ext.create('Ext.XTemplate',
'<tpl for=".">',
'<div class="jobLabelSelectBox">',
    '<div style="color:#000000">Job#:&nbsp;&nbsp;<b>{JobNo}</b></div>',
    '<div style="display:none;clear:left;float:left;color:#000000">Install: {InstallDate}</div>',
'</div>',
'</tpl>',
{
    formatDate: function (value) {
        return Ext.Date.format(value, 'M j, Y');
    }
});

Ext.define('jobtracker.view.joblabel', {
    extend: 'Ext.container.Container',
    itemId: 'jobLabel',
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
                itemId: 'jobLabelDataView',
                xtype: 'dataview',
                tpl: defaultJobLabelTpl,
                itemSelector: 'div.jobLabelSelectBox'
            }]
        }]
    }
});

