// function to load in a JSON file for the graph data
function importGraph() {


    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            const content = readerEvent.target.result; // this is the content of the file
            const data = JSON.parse(content);
            nodes.clear();
            edges.clear();
            nodes.add(data.nodes);
            edges.add(data.edges);
        }
    }
    input.click();

}


// function to download the current graph as a JSON file
function exportGraph() {

    const data = {
        nodes: nodes.get(),
        edges: edges.get()
    };

    const json = JSON.stringify(data);

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'myturing.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}


// create an array with nodes

var node_info = {
    "q1": [
        { "condition": "1", "update": "◦", "move": "R", "move_to": "q2" },
        { "condition": "•", "update": "•", "move": "R", "move_to": "qreject" },
        { "condition": "◦", "update": "◦", "move": "R", "move_to": "qreject" }
    ],
    "q2": [
        { "condition": "•", "update": "•", "move": "R", "move_to": "q2" },
        { "condition": "1", "update": "•", "move": "R", "move_to": "q3" },
        { "condition": "◦", "update": "◦", "move": "R", "move_to": "qaccept" }
    ],
    "q3": [
        { "condition": "•", "update": "•", "move": "R", "move_to": "q3" },
        { "condition": "◦", "update": "◦", "move": "L", "move_to": "q5" },
        { "condition": "1", "update": "•", "move": "R", "move_to": "q4" }
    ],
    "q4": [
        { "condition": "•", "update": "•", "move": "R", "move_to": "q4" },
        { "condition": "1", "update": "1", "move": "R", "move_to": "q3" },
        { "condition": "◦", "update": "◦", "move": "R", "move_to": "qreject" }
    ],
    "q5": [
        { "condition": "•", "update": "•", "move": "L", "move_to": "q5" },
        { "condition": "1", "update": "1", "move": "L", "move_to": "q5" },
        { "condition": "◦", "update": "◦", "move": "R", "move_to": "q2" },
    ],
    "qaccept": [],
    "qreject": [],
}

// console.log(typeof node_info)

var start_color = { "highlight": { "border": "#3b3bca", "background": "#8b8bff" }, "hover": { "border": "#3b3bca", "background": "#8b8bff" }, "border": "#3b3bca", "background": "#6E6EFD" }
var accept_color = { "highlight": { "border": "#4eb413", "background": "#92e562" }, "hover": { "border": "#4eb413", "background": "#92e562" }, "border": "#4eb413", "background": "#7BE141" }
var deny_color = { "highlight": { "border": "#c84b4e", "background": "#ff999b" }, "hover": { "border": "#c84b4e", "background": "#ff999b" }, "border": "#c84b4e", "background": "#FB7E81" }

var current_q_index = 5
var start_node = "q1"
var start_id = null

var selected_node

// define playback speed as 1 second by default
var playback_speed = 1000

// define components of the machine
var network
var nodes
var edges

// function to make the graph given the node information
function make_graph(initial_draw = false) {
    nodes = new vis.DataSet([])
    edges = new vis.DataSet([])
    //creates nodes and edges from the relationship
    Object.entries(node_info).forEach(([node_name, node_details], index) => { //iterates over the node_info object, getting the key,value and key index 
        // console.log(`${node_name}: ${node_details}`);
        let node_info_dict = { label: node_name }
        if (node_name == start_node) {
            //if the node we are on is known as the start node then we use it
            node_info_dict["color"] = start_color
        }
        else if (node_name == "qaccept") {
            node_info_dict["color"] = accept_color
        }
        else if (node_name == "qreject") {
            node_info_dict["color"] = deny_color
        }
        node_id = nodes.update(node_info_dict);//adds the key as a node    
        if (node_name == start_node) {
            start_id = node_id[0]
        }
    }
    )

    function get_node_by_label(label) {
        let node_id = null
        nodes.forEach(myFunction)
        function myFunction(item, index, arr) {
            if (item.label == label) {
                node_id = item.id
            }
        }
        return node_id
    }

    Object.entries(node_info).forEach(([node_name, node_details], index) => { //iterates over the node_info object, getting the key,value and key index 
        for (const transition of node_details) {  //iterates over the transitions in the object value for a given node
            console.log(transition)
            //to -> the index of the key inside of "move_to"
            //label -> construction from condition / update / move
            let trans_obj = { from: get_node_by_label(node_name), to: get_node_by_label(transition.move_to), label: `${transition.condition} / ${transition.update} / ${transition.move}`, custom_data: transition }
            let rest = edges.update(trans_obj);
            console.log("rest", rest)
        }
    }
    )

    // create a network and get the div with id 'mynetwork'
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {
        edges: {
            "arrows": {
                "to": {
                    "enabled": true,
                }
            }
        }

    };

    if (initial_draw) {
        network = new vis.Network(container, data, options);
    }
    else {
        network.body.emitter.emit('_dataChanged')
        network.redraw()
    }

}

// this function serves as a pause between each step of computation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// function to change the style of the current state or traversed edge.
async function select_edges_animation() {
    for (const edgeId of network.body.edgeIndices) {
        console.log("Selecting an edge", edgeId);
        network.selectEdges([edgeId])
        await sleep(playback_speed);
    }
}

// recursive function to run the machine and update the tape and state.
async function run_machine(tape, current_tape_index, current_node_id) {
    renderTape(current_tape_index)
    network.selectNodes([current_node_id], false)
    if (nodes.get(current_node_id).label.startsWith("qaccept")) {
        document.getElementById("currently_active").style.borderColor = "green"
        console.log("ACCEPTED")
        return true
    }
    else if (nodes.get(current_node_id).label.startsWith("qreject")) {
        document.getElementById("currently_active").style.borderColor = "red"
        console.log("REJECTED")
        return false
    }

    console.log("--- RUNNNING COMPUTATION ROUND ")
    let connected_edges = network.getConnectedEdges(current_node_id)
    let tape_content = tape[current_tape_index]
    console.log("Current Node:", nodes.get(current_node_id).label)
    console.log("current tape content:", tape)
    console.log("current tape index:", current_tape_index)
    console.log("connected_edges:", connected_edges.length)
    await sleep(playback_speed);
    for (const connected_edge_id of connected_edges) {  //iterates over the transitions in the object value for a given node
        let transition = edges.get(connected_edge_id)
        if (transition.custom_data.condition == tape_content && transition.from == current_node_id) {
            console.log("Found matching transition from", nodes.get(transition.from).label, "to", nodes.get(transition.to).label)
            console.log("Highlighting edge", connected_edge_id)
            network.selectEdges([connected_edge_id])//highlights the edge
            await sleep(playback_speed);//sleeps for 1 second
            let new_node_id = transition.to
            console.log(`Updating contents of tape at index ${current_tape_index} to ${transition.custom_data.update}`)
            tape[current_tape_index] = transition.custom_data.update
            if (transition.custom_data.move == "L") {
                current_tape_index = current_tape_index - 1;
                if (current_tape_index < 0) {
                    tape.unshift("◦")
                    current_tape_index = current_tape_index + 1
                }
                console.log("new tape content:", tape)
                return run_machine(tape, current_tape_index, new_node_id)
            }
            else if (transition.custom_data.move == "R") {
                current_tape_index = current_tape_index + 1;
                if (current_tape_index >= tape.length) {
                    tape.push("◦")
                }
                console.log("new tape content:", tape)
                return run_machine(tape, current_tape_index, new_node_id)
            }
            else {
                console.log("ERROR - TRANSITION SHIFT TO", transition.custom_data.move, "INVALID")
            }
        }
        //console.log(edges[connected_edge])
    }
    console.log("ERROR - FAILED TO FIND ANY MATCHING TRANSITION - MACHINE HALTED")
    document.getElementById("currently_active").style.borderColor = "purple"
    return "failure"
}

// function to add a node
function addNode() {
    node_name = `q${++current_q_index}`
    // document.getElementById('rejecting_state').checked
    // document.getElementById('accepting_state').checked
    // node_info[`q${++current_q_index}`] = []
    // make_graph()
    nodes.update({ "label": node_name })
    //nodes.remove(id)
}

// function to delete an edge or node
function deleteElement() {

    if (nodes.get(selected_node).label == "q1" || nodes.get(selected_node).label == "qaccept" || nodes.get(selected_node).label == "qreject") {
        console.log("Can't delete accepting, rejecting or initial states!")
        return;
    }


    network.deleteSelected()



    console.log(node_info)
}

// var tape = ["◦",1, 1, 1, 1,"◦"];
var tape = [1, 1, 1, 1];

// function to render the memory tape on screen
function renderTape(current_tape_index) {
    tape_row_html = ""
    for (let i = 0; i < tape.length; i++) {
        if (current_tape_index == i) {
            tape_html_section = `<td data-tape-index="${i}" id="currently_active">${tape[i]}</td>`
        }
        else {
            tape_html_section = `<td data-tape-index="${i}">${tape[i]}</td>`
        }
        tape_row_html = tape_row_html + tape_html_section
    }
    document.getElementById("table_table_row").innerHTML = tape_row_html;
}

// function to change the memory tape
function changeTape(current_tape_index = 0) {
    //tape = document.getElementById("tape_input").value.split(/[ ,]+/);
    tape = document.getElementById("tape_input").value.split('')
    renderTape(current_tape_index)
}

// function that begins the recursive call
function runMachine() {
    run_machine(tape, 0, start_id)
}

make_graph(true);
renderTape(0);

// function to print out the id of nodes and edges
network.on('click', function (properties) {
    selected_node = properties.nodes[0]
    console.log('clicked node ' + selected_node);
    console.log('clicked node ' + nodes.get(selected_node).label);
});

// function
function selectTo(element) {
    if (!selected_node) { return }
    element.innerHTML = nodes.get(selected_node).label
    element.dataset.nodeid = selected_node
}

// function to add an edge to the graph using the user input
function addEdge() {
    console.log("adding edge1")
    to = document.getElementById("to_button").dataset.nodeid
    read = document.getElementById("read_input").value
    write = document.getElementById("write_input").value
    from = document.getElementById("from_button").dataset.nodeid
    move = document.getElementById("left_right").value
    // move = "R"
    console.log(to, read, write, from, move)

    let custom_data = { "condition": read, "update": write, "move": move }
    let trans_obj = { from: from, to: to, label: `${read} / ${write} / ${move}`, custom_data: custom_data }
    edges.update(trans_obj);
}

// function to change the speed of the simulation
function changePlayback(element) {
    document.getElementById("playback_icon").innerHTML = `Playback Speed: ${element.value} ms`
    playback_speed = parseInt(element.value)
}

// (async () => {
//     result = await run_machine(tape, 0, start_id)
//     console.log("RESULT:", result)
// })()