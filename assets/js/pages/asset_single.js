class AssetViewer {
    constructor() {
        this.assetViewer = document.getElementById('asset-viewer');
        if (!this.assetViewer) return;

        this.URLParams = new URLSearchParams(window.location.search);
        this.assetId = this.URLParams.get('id');
        this.infoUrl = '/build/info/info.json';


        this.init();

    }

    async init() {
        try {
            const response = await fetch(this.infoUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            if (!this.assetId) {
                this.assetViewer.innerHTML = `
                <div class="message">
                    <h1 class="title">Asset id is missing</h1>
                </div>
                `;
                return;
            }

            const asset = data.asset.find(a => String(a.id) === String(this.assetId));
            if (asset) {
                this.render(asset);
            } else {
                console.error('[AssetViewer] Asset not found');
                this.assetViewer.innerHTML = `
                <div class="message">
                    <h1 class="title">Asset not found</h1>
                </div>
                `;
            }
        } catch (error) {
            console.error('[AssetViewer] Error fetching asset data:', error);
            this.assetViewer.innerHTML = `
            <div class="message">
                <h1 class="title">Error fetching asset data</h1>
            </div>
            `;
        }
    }

    render(asset) {
        document.title = `${asset.heading} - FWS`;

        this.assetViewer.innerHTML = `
       <div class="asset">
          <img class="image" src="${asset.thumbnail}" alt="${asset.heading}">
          <div class="wrapper">
            <div class="top">
${asset.link ? `
            <a class="link" href="${asset.link}" title="View">
                  <svg class="icon">
                    <use href="/assets/image/svg/icons.svg#arrow-up-right" />
                  </svg>
            </a>` : ''}
            <a class="link" href="${asset.download ?? asset.thumbnail}" download title="Download">
                  <svg class="icon">
                    <use href="/assets/image/svg/icons.svg#download" />
                  </svg>
            </a>
            </div>
            <div class="bottom">
              <h1 class="h5 title">${asset.heading}</h1>
            </div>
          </div>
        </div>
       `;
    }
}

new AssetViewer();
