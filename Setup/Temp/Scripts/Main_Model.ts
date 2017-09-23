﻿class Case {
    CaseID: number;
    DTCreated: Date;
    DTReceived: Date;
    DTClosed: Date;
    DTAbandoned: Date;
    CustomerFirstName: string;
    CustomerLastName: string;
    CustomerUserID: string;
    CustomerComputerName: string;
    CustomerPhone: string;
    CustomerEmail: string;
    SupportCategory: string;
    SupportType: string;
    SupportQueue: string;
    Details: string;
    Locked: boolean;
    LockedBy: string;
}
class Tech_Account {
    FirstName: string;
    LastName: string;
    UserID: string;
    HashedPassword: string;
    AuthenticationToken: string;
    TempPassword: string;
    BadLoginAttempts: number;
    LastBadLogin: Date;
    Email: string;
    ComputerGroups: string[];
    AccessLevel: AccessLevel;
}
class Computer {
    ComputerName: string;
    LastReboot: Date;
    CurrentUser: string;
    LastLoggedOnUser: string;
    ComputerGroup: string;
}
enum AccessLevel {
    Standard,
    Admin
}
enum ConnectionType {
    Customer,
    Technician
}
class Main_Model {
    constructor() {
        this.Cases = [];
    }
    UserID: string;
    AuthenticationToken: string;
    LoggedIn: boolean;
    Socket_Main: WebSocket;
    Socket_Port: string;
    Secure_Socket_Port: string;
    Cases: Case[];
    Tech_Accounts: Tech_Account[];
    Hub_Computers: Computer[];
    Context: ConnectionType;
    LastTypingStatus: Date;
    QueueWaitTimer: null;
    PartnerFirstName: string;
    PartnerLastName: string;
    ComputerGroups: string[];
    Temp: {};
    get HostAndPort():string {
        var hostAndPort = location.host;
        if (this.Secure_Socket_Port != "443") {
            if (location.protocol.search("https") > -1) {
                hostAndPort = location.hostname + ":" + this.Secure_Socket_Port;
            }
        }
        if (this.Socket_Port != "80") {
            if (location.protocol.search("https") == -1) {
                hostAndPort = location.hostname + ":" + this.Socket_Port;
            }
        }
        return hostAndPort;
    }
}
const InstaTech = new Main_Model();
InstaTech.Socket_Port = "80";
InstaTech.Secure_Socket_Port = "443";
InstaTech.Temp = {};