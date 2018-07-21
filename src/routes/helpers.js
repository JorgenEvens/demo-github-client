const RootNode = {
    name: 'root-node',
    render(createElement) {
        return createElement('router-view');
    }
};

export
function wrapNode(path, children) {
    const route = children.filter(r => {
        if (!r.name)
            return false;

        const path = (r.path || '').replace(/^\s+|\s+$/, '');

        return path === '';
    }).pop();

    if (!route)
        throw new Error('No Route to attach to root');

    const { name } = route;

    return {
        path,
        name: `${name}.index`,
        redirect: { name },
        component: RootNode,
        children: children.map(r => ({
            ...r,
            path: r.path || ''
        }))
    };
}

