link_package () {
    rm -rf /usr/local/bin/$1
    ln -s "$(pwd)/packages/reactship/bin/$1.js" /usr/local/bin/$1
}

link_package reactship
