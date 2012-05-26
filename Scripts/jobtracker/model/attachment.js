﻿//
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


Ext.define('jobtracker.model.attachment', {
    extend: 'Ext.data.Model',
    fields: ['HasAttachment', 'AttachmentName'],
    belongsTo: 'jobtracker.model.job'
});

Ext.define('jobtracker.store.attachmentstore', {
    extend: 'Ext.data.Store',
    model: 'jobtracker.model.attachment',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'Dispatchers/XML/GetAttachmentsHandler.ashx',
        extraParams: {
            JobID: '9857FD92-3858-E111-A7DB-782BCB0CCADC'
        },
        reader: {
            type: 'xml',
            record: 'Attachment'
        }
    },

    initComponent: function () {
        this.superclass().initComponent.call(this);
    }
});

