#!/bin/bash
set -e

# Fix locale settings to avoid warnings
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

echo "Setting up development environment..."

# Add custom bin to PATH for both bash and zsh
echo 'export PATH=$PATH:/workspace/.devcontainer/bin' >> ~/.bashrc
echo 'export PATH=$PATH:/workspace/.devcontainer/bin' >> ~/.zshrc

# Bin scripts should already be executable from host filesystem
# PATH is set in Dockerfile: ENV PATH="/workspace/.devcontainer/bin:${PATH}"

# Add flashy prompt for bash
cat >> ~/.bashrc << 'EOF'

# Custom flashy prompt
export PS1='\[\033[1;31m\]╭─\[\033[1;33m\]󰣇\[\033[1;31m\] \u\[\033[0;90m\]@\[\033[1;36m\]\h\[\033[0;90m\] in \[\033[1;35m\]\w\[\033[1;31m\]
╰─\[\033[1;33m\]▶\[\033[0m\] '
EOF

# Add flashy prompt for zsh
cat >> ~/.zshrc << 'EOF'

# Custom flashy prompt for zsh
export PS1='%F{red}╭─%F{yellow}󰣇%F{red} %n%f@%F{cyan}%m%f in %F{magenta}%~%F{red}
╰─%F{yellow}▶%f '
EOF

source /workspace/.devcontainer/.env
echo "Development environment setup complete!"