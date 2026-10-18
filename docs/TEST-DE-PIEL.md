# Test de piel (`/pages/quiz-de-piel`)

Portado del tema anterior (motor v14) con el diseño Color Pop. Plantilla `templates/page.quiz.json` (mismo nombre que la actual, así la página `quiz-de-piel` la usa sin tocarla).

- **Motor:** `assets/sl-quiz.js`. Filtra por tipo de piel, elige rutina o kit según las respuestas y puntúa con las etiquetas de los productos (`quiz-rutina`, `quiz-kit`, `tipo-piel-*`, `objetivo-*`, `rutina-3-pasos` / `rutina-4-pasos`). Usa la colección `recomendaciones-quiz`. No se tocó ningún dato.
- **Cambios respecto al tema anterior:**
  - Sin precio tachado de Shopify: en el resultado se muestra "Por separado" y "Ahorras", calculados con `sl-bundle-sum`.
  - Textos sin promesas: "formulada exactamente para tu perfil" → "calza con tu perfil"; "Prevenir o reducir arrugas" → "Arrugas finas y falta de firmeza".
  - Sin botón flotante ni banner del quiz (ver regla 9: nada de overlays).
  - Los textos de botones y campos están en los ajustes de la sección.
- **Registro del email:** formulario nativo de clientes de Shopify (etiquetas `quiz-*`), igual que antes.
- **Klaviyo:** apagado (ajustes vacíos). En el tema anterior enviaba la suscripción y el evento "Skin Quiz Completed" a Klaviyo desde el navegador. Para encenderlo hay que completar la clave pública y el ID de lista en la sección, y decidir si ese evento cumple la regla de "cero seguimiento en el tema". **Pendiente de OK.**
