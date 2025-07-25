// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> 概况简介</a></li><li class="chapter-item expanded "><a href="Chinese-H-6-Bomber.html"><strong aria-hidden="true">2.</strong> 中国造轰-6轰炸机</a></li><li class="chapter-item expanded "><a href="Meritorious-Jet-Fighter.html"><strong aria-hidden="true">3.</strong> 功勋喷气式歼击机</a></li><li class="chapter-item expanded "><a href="U.S.P-51D-Mustang-Fighter.html"><strong aria-hidden="true">4.</strong> 美国造P-51D野马战斗机</a></li><li class="chapter-item expanded "><a href="Japenese-Tachikawa-Advanced-Trainer-Aircraft-Type99.html"><strong aria-hidden="true">5.</strong> 日本造立川九九式高级教练机</a></li><li class="chapter-item expanded "><a href="Chinese-Q-5-attacter.html"><strong aria-hidden="true">6.</strong> 中国造强-5强击机</a></li><li class="chapter-item expanded "><a href="Wreckage-of-The-U.S-Ryan-147.html"><strong aria-hidden="true">7.</strong> 美国造BQM-147无人驾驶高空侦察机残骸</a></li><li class="chapter-item expanded "><a href="Wreckage-of-U.S-U-2-High-Altitude-Reconnaissance-Aircraft.html"><strong aria-hidden="true">8.</strong> 美国造U-2高空侦察机残骸</a></li><li class="chapter-item expanded "><a href="Chinese-J-6-Fighter.html"><strong aria-hidden="true">9.</strong> 中国造歼-6歼击机</a></li><li class="chapter-item expanded "><a href="Chinese-J-8-Fighter.html"><strong aria-hidden="true">10.</strong> 中国造歼-8歼击机</a></li><li class="chapter-item expanded "><a href="df.html"><strong aria-hidden="true">11.</strong> 东风一号和东风二号</a></li><li class="chapter-item expanded "><a href="Meritorious-Torpedo-Boat.html"><strong aria-hidden="true">12.</strong> 功勋鱼雷快艇</a></li><li class="chapter-item expanded "><a href="Heroic-Gunboat-in-the-Toumengshan-Naval-Battle.html"><strong aria-hidden="true">13.</strong> 头门山海战英雄艇</a></li><li class="chapter-item expanded "><a href="Meritorious-Tank.html"><strong aria-hidden="true">14.</strong> 功勋坦克</a></li><li class="chapter-item expanded "><a href="Hero-Tank.html"><strong aria-hidden="true">15.</strong> 功臣号坦克</a></li><li class="chapter-item expanded "><a href="Heroic-Tank-NO.215.html"><strong aria-hidden="true">16.</strong> 英雄的215坦克</a></li><li class="chapter-item expanded "><a href="Chinese-Medium-Tank-Type-59.html"><strong aria-hidden="true">17.</strong> 59式中型坦克</a></li><li class="chapter-item expanded "><a href="Soviet-T-62-Main-Battle-Tank.html"><strong aria-hidden="true">18.</strong> 苏联造T-62中型坦克</a></li><li class="chapter-item expanded "><a href="U.S.M-26-Pershing-Heavy-Tank.html"><strong aria-hidden="true">19.</strong> 美国造M26潘兴重型坦克</a></li><li class="chapter-item expanded "><a href="Soviet-Rocket-Launcher-BM-13.html"><strong aria-hidden="true">20.</strong> 苏联造BM-13火箭炮（喀秋莎）</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
