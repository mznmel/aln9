function aln9(t) {

    var toc = [];

    // clean
    t = t.replace(/\r/g, "");

    // headings

    function heading_name_sanitize(name) {
        return name.replace(/\"/gm, "");
    }

    t = t.replace(/^(#+)( +)(.*)$/gm, function(m1, m2, m3, m4) {
        var h_title = m4.trim();
        var h_len = m2.length;
        var h_class = "";

        if(m3.length >= 5) {
            h_class = "center-text"
        } else {
            toc.push(h_title);
        }

        return "<h" + h_len + " class=\"" + h_class + "\">"
                + "<a name=\"" + heading_name_sanitize(h_title) + "\">\n"
                +  h_title
                + "</a></h" + h_len + ">\n";
    });

    // toc
    var toc_html = "<ul>";
    for(var i = 0; i < toc.length; i++) {
        toc_html += "<li><a href=\"#" + heading_name_sanitize(toc[i])  + "\">" + toc[i] + "</a></li>"
    }
    toc_html += "</ul>";
    t = t.replace("(((جدول المحتويات)))", toc_html);

    // ul list
    t = t.replace(/^\*[\s\S]*?\n[^\*]/gm, function(m1) {
        var items = m1.trim().split('\n');
        var lst_html = "<ul>";
        for(var i = 0; i < items.length; i++) {
            lst_html += "<li>" + items[i].substring(1, items[i].length) + "</li>";
        }
        lst_html += "</ul>\n";
        return lst_html;
    });

    // bold
    t = t.replace(/\_\_(.*)\_\_/gm, "<strong>$1</strong>");

    // hr
    t = t.replace(/\-\-\-\-\-(\-+)/gm, "<hr>\n");


    // q
    t = t.replace(/\"\"(.*?)\"\"/gm, "<q>$1</q>\n");

    // link with a title
    t = t.replace(/\(\(\((.*?)((\:\:\:)(.*?))?\)\)\)/gm, function(m1, m2, m3) {
        var link_title = m2;
        var link_src = "";

        if(m3) {
            link_src = m3.substring(3, m3.length) // removes ':::'
        } else {
            link_src = m2;
        }

        return "<a href=\"" + link_src + "\">" + link_title + "</a>\n";
    });

	// نص مائل
	t = t.replace(/\\\s?(.+)\\\s?/gm,"<i>$1</i>");
	// نص يتوسطه خط
	t = t.replace(/=-\s?(.+)\s?-=/gm,"<del>$1</del>");
	// نص اسفله خط
	t = t.replace(/=_\s?(.+)\s?_=/gm,"<ins>$1</ins>");
	// النص اعلى من النص الافتراضي
	t = t.replace(/=\^\s?(.+)\s?\^=/gm,"<sup>$1</sup>");
	// النص ادنى من النص الافتراضي
	t = t.replace(/=&\s?(.+)\s?&=/gm,"<sub>$1</sub>");
	// تلوين النص بطريقة Hex ثلاثية وسداسية
	t = t.replace(/\@\((#([a-zA-Z]|[0-9]){3,6})\)\s?(.+)@/gm,"<span style=\"color: $1;\">$3</span>");
	t = t.replace(/@حجم\s{0,1}\(([0-9]+\s{0,1}(px|pt|%))\)(.+)@/gm,"<span style=\"font-size: $1;\">$3</span>");
	
    // p
    t = t.replace(/\n\n([^\n]+)\n/gm, "<p>$1</p>\n");

    return t;
}