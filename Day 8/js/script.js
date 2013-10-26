

 var redraw, g, renderer;

window.onload = function() {

    var width = $(document).width() - 20;
    var height = $(document).height() - 60;

    g = new Graph();
        g.addNode("Center", {
            label: "Five\nThings\nDevelopers\nShould\nKnow\nabout\nDesigners\nby\nAdobe\nSummarized\nby\nMe"
        });
        g.addNode("Not", {
            label : "1.\You\nare\nnot\na\ndesigner"
        });
        g.addNode("Eye", {
            label : "2.\nLead\nthe\nEye"
        });
            g.addNode("ChooseOne", {
                label : "\nChoose\none\nmessage"
            });
            g.addEdge("Eye", "ChooseOne");
            g.addNode("goldenratio", {
                label : "\nUse\nthe\nGolden\nRatio"
            });    
            g.addEdge("Eye", "goldenratio");  
            g.addNode("shapes", {
                label : "\nUse\nrounded\nedges\nto\nsoothe\nthe\neyes"
            });    
            g.addEdge("Eye", "shapes");  
            g.addNode("shapes", {
                label : "\nAvoid\nharsh\nstraight\nedges"
            });    
            g.addEdge("Eye", "shapes");    
        g.addNode("ColorImage", {
            label : "3.\nColor\nand\nImages"
        });
            g.addNode("emphasize", {
                label : "Color\nand\nImages\nshould\nemphasize\nwhat\nis\nimportant\nnot\nmerely\ndecorate"
            });
                g.addEdge("ColorImage", "emphasize");   
        g.addNode("TextTypography", {
            label : "4.\nText\nand\nTypography"
            });
            g.addNode("nomore", {
                label : "\nNo\nmore\nthan\nthree\nfonts"
            });   
                g.addEdge("TextTypography", "nomore");   
             g.addNode("noserif", {
                label : "\nNo\nserifs\nfor\ntech\nrelated\nwebsites"
            });   
                g.addEdge("TextTypography", "noserif");              



        g.addNode("Feedback", {
            label : "5.\nGet\nFeedback\nFrom\nothers"
        });
        g.addEdge("Center", "Not");
        g.addEdge("Center", "Eye");
        g.addEdge("Center", "ColorImage");
        g.addEdge("Center", "TextTypography");
        g.addEdge("Center", "Feedback");



    var layouter = new Graph.Layout.Spring(g);
    renderer = new Graph.Renderer.Raphael('canvas', g, width, height);

    redraw = function() {
        layouter.layout();
        renderer.draw();
    };
};

// g.addEdge("Red", "Blue");