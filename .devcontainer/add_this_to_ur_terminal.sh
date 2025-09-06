ccc() {
    if [ $# -eq 0 ]; then
        # Get running containers
        containers=$(docker ps --format "{{.Names}}")
        
        if [ -z "$containers" ]; then
            echo "❌ No running containers found"
            return 1
        fi
        
        # Count containers
        container_count=$(echo "$containers" | wc -l)
        
        if [ "$container_count" -eq 1 ]; then
            container="$containers"
            echo "🔗 Only one container found, connecting to: $container"
        else
            # Check if fzf is available for fuzzy search with arrow keys
            if command -v fzf >/dev/null 2>&1; then
                echo "🔍 Select container with arrow keys (or type to filter):"
                container=$(docker ps --format "{{.Names}}\t{{.Image}}\t{{.Status}}" | \
                    fzf --height=10 --border --prompt="Container: " --header="Use ↑↓ arrows or type to filter" | \
                    awk '{print $1}')
                
                if [ -z "$container" ]; then
                    echo "🚫 No container selected"
                    return 1
                fi
            else
                # Fallback: numbered selection
                echo "📋 Available containers:"
                echo "$containers" | nl -w2 -s') '
                echo
                read -p "🔢 Enter number (or press Enter for most recent): " choice
                
                if [ -z "$choice" ]; then
                    container=$(echo "$containers" | head -1)
                    echo "🔗 Connecting to most recent container: $container"
                elif [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -ge 1 ] && [ "$choice" -le "$container_count" ]; then
                    container=$(echo "$containers" | sed -n "${choice}p")
                    echo "🔗 Connecting to container: $container"
                else
                    echo "❌ Invalid selection"
                    return 1
                fi
            fi
        fi
    else
        container=$1
    fi
    
    docker exec -it --user node -w /workspace "$container" bash -c '
        # Apply all remoteEnv variables from devcontainer.json
        export NODE_OPTIONS="--max-old-space-size=4096"
        export CLAUDE_CONFIG_DIR="/home/node/.claude"
        export POWERLEVEL9K_DISABLE_GITSTATUS="true"
        
        # Start zsh with the proper environment
        exec zsh
    '
}