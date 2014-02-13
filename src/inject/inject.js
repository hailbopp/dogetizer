var tagger = new POSTagger();

$(document).ready(function () {
    var body = $('body');
    var terms = [];
    $('meta[name="description"]').each(function () {
        var value = $(this).attr('content');
        value = value.split(" ");
        for (var i = 0; i < value.length; i++) {
            var w = removeNonwords(value[i]);
            if (w.length > 0) terms.push(w);
        }
    });
    $('title').each(function () {
        var value = $(this).text();
        value = value.split(" ");
        for (var i = 0; i < value.length; i++) {
            var w = removeNonwords(value[i]);
            if (w.length > 0) terms.push(w);
        }
    });

    console.log(terms);
    var taggedwords = tagger.tag(terms);
    console.log(taggedwords);
    for (var i = 0; i < taggedwords.length; i++) {
        dogefy(taggedwords[i]);
    }
    var doges = $('.dogeText').length;
    var wows = doges/3;
    if(wows == 0) wows = 3;
    for(var i = 0; i < wows; i++){
        var color = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
        var top = ($(window).height() * Math.random()) + 'px';
        var left = ($(window).width() * Math.random()) + 'px';
        $('body').append("<div class='dogeText' style='color:" + color + "; top:" + top + ";left:" + left + ";' >wow</div>");

    }
});

var removeNonwords = function (v) {
    var toRemove = [".", "|", ",","'s","—","-"];
    for (var j = 0; j < toRemove.length; j++) {
        v = v.replace(toRemove[j], "");
    }
    v = removeExclusions(v);
    return v;
}

var removeExclusions = function (v) {
    var toRemove = ["you're","so"];
    for (var j = 0; j < toRemove.length; j++) {
        v = v.replace(toRemove[j], "");
    }
    return v;
}

var dogefy = function (t) {
    var accepted = [
        "VBG",
        "VBD",
        "VBN",
        "VBP",
        "VBZ",
        "VB",
        "NN",
        "NNS",
        "NNP",
        "NNPS",
        "JJ",
        "JJR",
        "JJS",
        "RB",
        "RBR",
        "RBS"
    ];

    console.log(t[1]);
    if (!($.inArray(t[1], accepted) > -1)) {
        console.log("not in accepted");
        return;
    }
    var color = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    var top = ($(window).height() * Math.random()) + 'px';
    var left = ($(window).width() * Math.random()) + 'px';
    var tag = "<div class='dogeText' style='color:" + color + "; top:" + top + ";left:" + left + ";' >";
    var tagEnd = "</div>";
    var mods = [];
    if (t[1].indexOf("VB") > -1) {
        mods.push("so");
        mods.push("such");
        mods.push("much");
        mods.push("many");
    } else if (t[1].indexOf("RB") > -1) {
        mods.push("what");
        mods.push("such");
        mods.push("many");
    } else if (t[1].indexOf("NN") > -1) {
        mods.push("so");
        mods.push("such");
        mods.push("much");
        mods.push("many");
    } else if (t[1].indexOf("JJ") > -1){
        mods.push("many");
        mods.push("much");
        mods.push("wow");
    }
    var mod = mods[Math.floor(Math.random() * mods.length)];
    tag += mod + " " + t[0].toLowerCase() + tagEnd;
    $('body').append(tag);
}

