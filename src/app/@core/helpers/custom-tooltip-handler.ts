export class CustomTooltipHandler {

    public dataForLabel: any[];

    // <block:external:2>
    private getOrCreateTooltip = (chart: { canvas: { parentNode: { querySelector: (arg0: string) => any; appendChild: (arg0: any) => void; }; }; }) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');

        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
            tooltipEl.style.borderRadius = '3px';
            tooltipEl.style.color = 'white';
            tooltipEl.style.opacity = 1;
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.transform = 'translate(-50%, 0)';
            tooltipEl.style.transition = 'all .1s ease';

            const table = document.createElement('table');
            table.style.margin = '0px';
            table.style.width= 'max-content';
            table.style.maxWidth= '300px';
            tooltipEl.appendChild(table);
            chart.canvas.parentNode.appendChild(tooltipEl);
        }

        return tooltipEl;
    };

    public externalTooltipHandler = (context: { chart: any; tooltip: any; }) => {
        // Tooltip Element
        const { chart, tooltip } = context;
        const tooltipEl = this.getOrCreateTooltip(chart);

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        // Set Text
        if (tooltip.body) {
            const titleLines = tooltip.title || [];
            const bodyLines = tooltip.body.map((b: { lines: any; }) => b.lines);

            const tableHead = document.createElement('thead');


            for (let i = 0; i < titleLines.length; i++) {
                const title= titleLines[i];
                const tr = document.createElement('tr');
                tr.style.borderWidth = "0";

                const th = document.createElement('th');
                th.style.borderWidth = "0";
                const text = document.createTextNode(this.dataForLabel.filter(val=> val.cariAdi.startsWith(title))[0].cariAdi);

                th.appendChild(text);
                tr.appendChild(th);
                tableHead.appendChild(tr);
            }

           console.log(tooltip.body);

            const tableBody = document.createElement('tbody');
            bodyLines.forEach((body: string, i: number) => {
                const colors = tooltip.labelColors[i];
                
                const span = document.createElement('span');
                span.style.background = colors.backgroundColor;
                span.style.borderColor = colors.borderColor;
                span.style.borderWidth = '2px';
                span.style.marginRight = '10px';
                span.style.height = '10px';
                span.style.width = '10px';
                span.style.display = 'inline-block';

                const tr = document.createElement('tr');
                tr.style.backgroundColor = 'inherit';
                tr.style.borderWidth = "0";

                const td = document.createElement('td');
                td.style.borderWidth = "0";

                const text = document.createTextNode(body);

                td.appendChild(span);
                td.appendChild(text);
                tr.appendChild(td);
                tableBody.appendChild(tr);
            });

            const tableRoot = tooltipEl.querySelector('table');

            // Remove old children
            while (tableRoot.firstChild) {
                tableRoot.firstChild.remove();
            }

            // Add new children
            tableRoot.appendChild(tableHead);
            tableRoot.appendChild(tableBody);
        }

        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
    };
    // </block:external>
}