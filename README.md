# Remote System Control

## Description / Problem
As part of my participation in mentoring program from Intel, I solved the problem of remotely controlling a system and network from another 
location.

I designed the architecture and wrote an application with simple web interface based on running one-off functional containers performing the target function (like WakeOnLAN)

## Architecture in schema
(in progress)

## Structure in technologies
### Core
- [] Python script as a Linux service entry on host machine
- [Provider] Container with Python Flask backend
- [Connector] Container with ssh connectivity bash script

### Server
- [Backend] Container with Python Flask backend
- [Frontend] Container with React on Vite with TypeScript
- [OpenSSHServer] Container for SSH connections

### Middle auth server
Used to check willingness to connect. Should be publicly accessible via SSH.

## UI Views
### Home view
![Home view](https://github.com/user-attachments/assets/da99cce7-6523-4f46-80da-35f43b5dbd0d)

### Dashboard view - Tools
![Dashboard view - Tools (1)](https://github.com/user-attachments/assets/e2699d86-37b8-4df0-9697-2f00f31c6bc8)


### Dashboard view - Logger
![Dashboard view - Logger](https://github.com/user-attachments/assets/18d51064-2b8a-4405-aabb-cf23045f0152)


### Packages
#### Core
- Paramiko (for SSH)
- Docker
