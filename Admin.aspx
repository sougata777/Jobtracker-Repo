<%@ Page Title="Administration" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeBehind="Admin.aspx.cs" Inherits="JobTracker.Admin" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">

    <script type="text/javascript" src="Scripts/jobtracker/controller/admincontroller.js"></script>

    <style type="text/css">
        a:link {color:#2e408c;}   
        a:visited {color:#2e408c;}
        a:hover {color:#2e408c;}
        a:active {color:#2e408c;}
        
        .newUserIcon {
            background-image: url(Images/user_add.png) !important;
        }
        
        .clearCacheIcon {
            background-image: url(Images/refresh_32.png) !important;
        }                
    </style>
    
    <script type="text/javascript">

        Ext.require(['Ext.data.*']);

        Ext.onReady(function () {

            var nu = newUserButton();
            var cc = clearCacheButton();

        });

    </script>
</asp:Content>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">

    <div style="margin:50px;margin-top:50px;margin-left:40px;float:left;">
        <div id="newUserButton" class="newUserButton" style="float:left"></div>
        <div style="clear:both;height:10px"></div>
        <div id="clearCacheButton" class="clearCacheButton" style="clear:both;"></div>
    </div>

</asp:Content>
