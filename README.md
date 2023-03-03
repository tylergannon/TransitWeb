# Transit Web

Human Design for the people

## Ansible Controller

Requirements:

- Copy of this repository.
- Choose hostname.  For now, that is `me.transithd.com`.
- Go to Digital Ocean and ensure you have three DNS records.  The last two
  will be the virtual hosts for the development server and a production-mode
  server on which you can stage your changes.

  1. `hostname`
  2. `prod.hostname`
  3. `dev.hostname`

- Ansible installed.
- New Ubuntu VPS:
  - Currently require Ubuntu Jammy, for Ansible playbook to work.
  - Place hostname in `ansible/inventory.yml`
  - Ensure your ssh configuration will allow passwordless ssh login to
    `root@<your-host>`.


## Development Setup

1. Start on an Ansible controller that has root access to the server.
1. Clone this repository.
1. Run `make ansible`
1. Connect via ssh to the server.
1. Add a `.env.local` file containing: 
  - GITHUB_OAUTH_SECRET
1. The database should be properly configured already via ansible.
1. Create Docker images by running `make`.
1. Start astroapi and production service with `docker-compose up -d`
1. Install npm packages `npm install`
1. Run dev server: `npm run dev -- --host`

