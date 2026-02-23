import { genRoot, genWidget } from '../templates/index.mjs';

class HtmlBuilder {
    buildPage(htmlFragment, finalItemInfo) {
        let leftContent = '';
        let rightContent = '';

        if (finalItemInfo?.type === 'manifest') {
            leftContent += genWidget('toc');
        }

        if (finalItemInfo?.type === 'inventory') {
            leftContent += genWidget('detail', finalItemInfo);

            if (finalItemInfo?.demo) {
                const actionInfo = {
                    buttons: {
                        'preview': finalItemInfo.demo,
                    }
                };
                rightContent += genWidget('action', actionInfo);
            }
        }

        return genRoot(htmlFragment, leftContent, rightContent, finalItemInfo);
    }
}

export const htmlBuilder = new HtmlBuilder();
