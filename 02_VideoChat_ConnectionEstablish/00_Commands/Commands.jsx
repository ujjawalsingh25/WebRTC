// ____________________________________________________________________________________________
// _________________    Command in Command Prompt to KILL BUSY PORTS   _____________________|_|
//                                                                                          | |
// C:\Users\Ujjawal Singh>netstat -ano | findstr :3000                                      | |
//   TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       16704             | |
//   TCP    [::]:3000              [::]:0                 LISTENING       16704             | |
//                                                                                          | |
// C:\Users\Ujjawal Singh>taskkill /PID 16704 /F                                            | |
// _________________________________________________________________________________________| |
// _________________________________________________________________________________________|_|


// npm i
// npm i express body-parser socket.io
// npm i react-router-dom
// npm i socket.io-client
// npm i react-player