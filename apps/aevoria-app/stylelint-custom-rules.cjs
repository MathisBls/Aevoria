const stylelint = require('stylelint');
const ruleName = 'custom/aevoria-rules';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (value) => `Utilisez rem-calc() au lieu de ${value}`,
  rejectedColor: (value) => `Utilisez une variable de couleur ($color-*) au lieu de ${value}`,
  rejectedFont: (value) => `Utilisez les classes .montserrat ou .instrument-sans au lieu de font-family: "${value}"`
});

module.exports = stylelint.createPlugin(ruleName, (enabled, options = {}) => {
  return (root, result) => {
    if (!enabled) return;

    root.walkDecls(decl => {
      const { prop, value } = decl;
      const enforcePxToRem = options.enforcePxToRem !== false;
      const enforceColorVar = options.enforceColorVar === true;
      const enforceFontFamily = options.enforceFontFamily === true;

      // Vérifier l'utilisation de px de manière plus subtile
      if (enforcePxToRem && value.includes('px')) {
        // Extraire la valeur numérique
        const pxMatch = value.match(/(\d+(?:\.\d+)?)px/);
        if (pxMatch) {
          const pxValue = parseFloat(pxMatch[1]);

          // Ne flagger que les valeurs importantes
          const shouldFlag = (
            // Tailles importantes (exclure max-width)
            (['width', 'height', 'min-width', 'min-height', 'max-height', 'font-size', 'line-height'].includes(prop) && pxValue >= 8) ||
            // Espacements significatifs (padding et margin)
            (['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'].includes(prop) && pxValue >= 1) ||
            // Positions importantes
            (['top', 'bottom', 'left', 'right'].includes(prop) && pxValue >= 8) ||
            // Gap et espacements de layout
            (['gap', 'row-gap', 'column-gap'].includes(prop) && pxValue >= 4) ||
            // Border-radius (seulement si assez grand)
            (prop === 'border-radius' && pxValue >= 8) ||
            // Transform scale/translate (seulement si assez grand)
            ((prop === 'transform' && (value.includes('scale') || value.includes('translate'))) && pxValue >= 8)
          );

          // Ne PAS flagger certaines propriétés
          const shouldIgnore = (
            // Ignorer toutes les propriétés border*, max-width, size
            prop.startsWith('border') ||
            prop === 'max-width' ||
            prop === 'size' ||
            // Ombres subtiles
            (prop.includes('box-shadow') && pxValue <= 4) ||
            // Z-index, opacité, flex/grid
            prop === 'z-index' ||
            prop === 'opacity' ||
            ['flex-basis', 'flex-grow', 'flex-shrink'].includes(prop) ||
            ['grid-template-columns', 'grid-template-rows', 'grid-column', 'grid-row'].includes(prop) ||
            // Media queries (doivent rester en px)
            (decl.parent && decl.parent.type === 'atrule' && decl.parent.name === 'media')
          );

          if (shouldFlag && !shouldIgnore) {
            stylelint.utils.report({
              message: messages.rejected(value),
              node: decl,
              result,
              ruleName
            });
          }
        }
      }

      // Vérifier les couleurs hexadécimales (optionnel)
      if (enforceColorVar) {
        // Ignorer les déclarations de variables SCSS ($variable: #hex)
        const isScssVariable = typeof prop === 'string' && prop.startsWith('$');
        if (!isScssVariable && (prop.includes('color') || prop.includes('background') || prop.includes('border')) &&
            /#[0-9a-fA-F]{3,6}/.test(value) &&
            !value.includes('$color-')) {
          stylelint.utils.report({
            message: messages.rejectedColor(value),
            node: decl,
            result,
            ruleName
          });
        }
      }

      // Vérifier les font-family hardcodées (optionnel)
      if (enforceFontFamily) {
        if (prop === 'font-family' && (value.includes('"Montserrat"') || value.includes('"Instrument Sans"'))) {
          stylelint.utils.report({
            message: messages.rejectedFont(value),
            node: decl,
            result,
            ruleName
          });
        }
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;

