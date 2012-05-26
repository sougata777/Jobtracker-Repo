<%@ Page Title="Manage Customers" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeBehind="Customers.aspx.cs" Inherits="JobTracker.Customers" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <script type="text/javascript" src="Scripts/jobtracker/model/customer.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/phonetype.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/jobtype.js"></script>

    <script type="text/javascript" src="Scripts/jobtracker/view/customerlist.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/view/createcustomerform.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/view/editcustomerform.js"></script>

    <script type="text/javascript" src="Scripts/jobtracker/controller/customercontroller.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/controller/printcontroller.js"></script>

    <style type="text/css">
        a:link {color:#2e408c;}   
        a:visited {color:#2e408c;}
        a:hover {color:#2e408c;}
        a:active {color:#2e408c;}
        
        .newCustomerIcon {
            background-image: url(Images/administrator_add.png) !important;
        }
        
        .printCustomersIcon {
            background-image: url(Images/printer_32.png) !important;
        }
        
        .defaultActionButtonIcon {
            background-image: url(Images/check_mark_16.png) !important;
        }
        
        .cancelButtonIcon {
            background-image: url(Images/close_16.png) !important;
        }
    </style>
    
    <script type="text/javascript">

        Ext.require(['Ext.data.*']);

        Ext.onReady(function () {
            var cl = listCustomers();

            var nb = newCustomerButton();
            var pc = printCustomersButton();
            var cf = createCustomerForm();
            var ef = editCustomerForm();

            // hook up event handlers
            cl.relayEvents(pc, ['printCustomers']);

            cl.on('printCustomers', function () {
                printCustomersPage();
            });

            cf.relayEvents(nb, ['newCustomer']);

            cf.on('newCustomer', function () {
                cf.setWidth(0);
                cf.setVisible(true);
                Ext.create('Ext.fx.Anim', {
                    target: cf,
                    duration: 500,
                    from: {
                        width: 10,
                        height: 10,
                    },
                    to: {
                        width: 380,
                        height: 570
                    }
                });
            });

            cf.on('cancelNewCustomer', function () {
                cf.setVisible(false);
            });

            cf.on('createCustomer', function (firstName, lastName, company, address1, address2, city, state, zip, addressType, phone1, phone2, phone3, phoneType1, phoneType2, phoneType3, jobType) {
                createCustomer(firstName, lastName, company, address1, address2, city, state, zip, addressType, phone1, phone2, phone3, phoneType1, phoneType2, phoneType3, jobType);
            });

            cf.on('customerCreated', function () {
                clearCustomerForm();
                customerCreated();
            });

            cf.on('createCustomerFailed', function () {
                createCustomerFailed();
            });

            cf.relayEvents(cl, ['customerSelected']);

            cf.on('customerSelected', function () {
                cf.setVisible(false);
            });

            ef.relayEvents(cl, ['customerSelected']);

            ef.relayEvents(nb, ['newCustomer']);

            ef.on('newCustomer', function () {
                ef.setVisible(false);
            });

            ef.on('cancelUpdateCustomer', function () {
                ef.setVisible(false);
            });

            ef.on('customerSelected', function (selectedNode) {
                ef.setWidth(0);
                ef.setVisible(true);
                Ext.create('Ext.fx.Anim', {
                    target: ef,
                    duration: 500,
                    from: {
                        width: 10,
                        height: 10,
                    },
                    to: {
                        width: 380,
                        height: 570
                    }
                });
                editCustomer(selectedNode.id);
            });

            ef.on('editCustomerFailed', function () {
                editCustomerFailed();
            });

            ef.on('updateCustomer', function (customerID, firstName, lastName, company, address1, address2, city, state, zip, addressType, phone1, phone2, phone3, phoneType1, phoneType2, phoneType3, jobType) {
                updateCustomer(customerID, firstName, lastName, company, address1, address2, city, state, zip, addressType, phone1, phone2, phone3, phoneType1, phoneType2, phoneType3, jobType);
            });

            ef.on('customerUpdated', function () {
                customerUpdated();
            });

            ef.on('updateCustomerFailed', function () {
                updateCustomerFailed();
            });

            nb.relayEvents(cl, ['customerSelected']);

            nb.on('customerSelected', function () {
                //nb.setVisible(false);
            });

            nb.relayEvents(ef, ['cancelUpdateCustomer']);

            nb.on('cancelUpdateCustomer', function () {
                nb.setVisible(true);
            });

            cl.relayEvents(cf, ['customerCreated']);

            cl.on('customerCreated', function (customerID) {
                refreshCustomerList(customerID);
            });

            cl.relayEvents(ef, ['customerUpdated']);

            cl.on('customerUpdated', function () {
                refreshCustomerList();
            });

            cl.on('customerDeleted', function () {
                customerDeleted();
                refreshCustomerList();
                nb.setVisible(true);
                ef.setVisible(false);
            });

            cl.on('deleteCustomerFailed', function () {
                deleteCustomerFailed();
            });
        });

    </script>
</asp:Content>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">

    <div style="margin:50px;margin-top:10px;margin-left:40px;float:left;">
        <div id="newCustomerButton" class="newCustomerButton" style="float:left"></div>
        <div id="printCustomersButton" class="printCustomersButton" style="float:left;margin-left:10px"></div>
        <div id="customerListPanel"  class="customerList" style="clear:both"></div>
    </div>

    <div style="margin:50px;margin-top:70px;margin-left:20px;float:left;">
        <div id="createCustomerForm" class="createCustomerForm"></div>
        <div id="editCustomerForm" class="editCustomerForm"></div>
    </div>

</asp:Content>
