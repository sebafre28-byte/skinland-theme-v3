/* Test de piel · motor v14 portado del tema anterior. Lee su configuración de [data-sl-quiz] y del JSON de la sección. */
(function(){
  var ROOT = document.querySelector('[data-sl-quiz]');
  if(!ROOT) return;
  var QID  = ROOT.dataset.qid;
  var NS   = ROOT.dataset.ns;
  var DATA = {};
  var NOMBRE = '';
  function conNombre(t){ t=String(t==null?'':t); if(NOMBRE) return t.replace(/\[nombre\]/g,esc(NOMBRE)); return t.replace(/\[nombre\],?\s*/g,'').replace(/^([a-záéíóú])/,function(c){ return c.toUpperCase(); }); }
  var ESTILO = ROOT.dataset.estilo || 'clasico';
  var SIN_MOVIMIENTO = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var VERSION = 'v14';
  function T(k,def){ var u=(DATA&&DATA.ui)||{}; return (u[k]!==undefined&&u[k]!=='')?u[k]:def; }

  /* ── Pesos del motor ── */
  var W = {
    PRINCIPAL_PRIMARIO   : 100,
    SECUNDARIO_PRIMARIO  : 40,
    PRINCIPAL_SECUNDARIO : 25,
    SECUNDARIO_SECUNDARIO: 10,
    SUAVE_REACTIVA       : 15,
    ALTA_REACTIVA        : -20
  };
  var UMBRAL_FUERTE  = 100;
  var UMBRAL_PARCIAL = 40;

  var state = {
    inline: { cur:0, answers:{} },
    modal:  { cur:0, answers:{} }
  };

  function instOf(rootId){ return rootId.indexOf('-modal') !== -1 ? 'modal' : 'inline'; }
  function $id(id){ return document.getElementById(id); }
  function unique(arr){ return arr.filter(function(x,i){ return arr.indexOf(x)===i; }); }

  function embed(url){
    url = url.trim(); var m;
    if((m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)))
      return 'https://www.youtube.com/embed/'+m[1]+'?autoplay=1&rel=0&modestbranding=1&playsinline=1';
    if((m = url.match(/vimeo\.com\/(\d+)/)))
      return 'https://player.vimeo.com/video/'+m[1]+'?autoplay=1&title=0&byline=0&portrait=0';
    return url;
  }

  function pct(i,total){ return Math.round(((i+1)/total)*100); }

  function scrollTop(rootId){
    if(ESTILO==='chat' && instOf(rootId)==='inline'){ var cu=$id(rootId+'-cuerpo'); if(cu) cu.scrollTo({ top:0, left:0, behavior:'auto' }); return; }
    if(instOf(rootId) === 'modal'){
      var box = $id(QID + '-modal-box');
      if(box) box.scrollTo({ top:0, left:0, behavior:'auto' });
      return;
    }
    var wrap = $id(QID + '-wrap');
    if(!wrap) return;
    var header = document.querySelector('sticky-header, .header-wrapper, .shopify-section-group-header-group, header');
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    var targetPosition = wrap.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
    window.scrollTo({ top: Math.max(0, targetPosition), left:0, behavior:'auto' });
  }

  function restoreAnswers(stepIdx, rootId, it){
    var steps=DATA.steps||[], step=steps[stepIdx];
    if(!step) return;
    var saved=state[it].answers[step.id];
    if(!saved||!saved.length) return;
    document.querySelectorAll('input[name="'+rootId+'-q'+stepIdx+'"]').forEach(function(inp){
      if(saved.indexOf(inp.value)!==-1) inp.checked=true;
    });
    var nb=$id(rootId+'-nb'+stepIdx); if(nb) nb.disabled=false;
  }

  /* ── Normalización: tolera la nomenclatura vieja del catálogo ── */
  function normalizeTag(tag){
    tag=String(tag||'').toLowerCase().trim();
    var aliases={
      'objetivo-hidratacion':'objetivo-hidratar',
      'objetivo-irritacion':'objetivo-calmar',
      'objetivo-control-sebo':'objetivo-poros',
      'grasa':'tipo-piel-grasa',
      'seca':'tipo-piel-seca',
      'mixta':'tipo-piel-mixta',
      'normal':'tipo-piel-normal',
      'sensible':'tipo-piel-sensible',
      'acne':'objetivo-antiacne',
      'poros':'objetivo-poros',
      'manchas':'objetivo-manchas',
      'arrugas':'objetivo-antiedad',
      'hidratacion':'objetivo-hidratar',
      'reactiva':'sensibilidad-reactiva'
    };
    return aliases[tag]||tag;
  }

  /* ── Lectura de respuestas por ROL de pregunta ── */
  function answersByRole(answers){
    var steps=DATA.steps||[];
    var out={ tipo_piel:'', objetivo_principal:'', objetivo_secundario:'', sensibilidad:'', nivel_rutina:'', otros:[] };
    steps.forEach(function(step){
      var vals=answers[step.id];
      if(!vals||!vals.length) return;
      var tag=normalizeTag(vals[0]);
      switch(step.role){
        case 'tipo_piel':           out.tipo_piel=tag; break;
        case 'objetivo_principal':  out.objetivo_principal=tag; break;
        case 'objetivo_secundario': out.objetivo_secundario=tag; break;
        case 'sensibilidad':        out.sensibilidad=tag; break;
        case 'nivel_rutina':        out.nivel_rutina=tag; break;
        default: vals.forEach(function(v){ out.otros.push(normalizeTag(v)); });
      }
    });
    return out;
  }

  function allAnswerTags(answers){
    var tags=[];
    Object.keys(answers||{}).forEach(function(k){
      var v=answers[k];
      if(Array.isArray(v)) v.forEach(function(t){ if(t) tags.push(normalizeTag(t)); });
      else if(typeof v==='string'&&v) tags.push(normalizeTag(v));
    });
    return unique(tags.filter(Boolean));
  }

  function humanTag(tag){
    var labels={
      'tipo-piel-grasa':'piel grasa',
      'tipo-piel-seca':'piel seca',
      'tipo-piel-mixta':'piel mixta',
      'tipo-piel-normal':'piel equilibrada',
      'tipo-piel-acneica':'tendencia acneica',
      'tipo-piel-sensible':'piel sensible',
      'tipo-piel-deshidratada':'piel deshidratada',
      'tipo-piel-madura':'piel madura',
      'objetivo-antiacne':'brotes y acné',
      'objetivo-poros':'poros y brillo',
      'objetivo-manchas':'manchas y tono desigual',
      'objetivo-antiedad':'líneas y firmeza',
      'objetivo-hidratar':'hidratación',
      'objetivo-calmar':'rojeces e irritación',
      'objetivo-luminosidad':'luminosidad',
      'objetivo-reparar-barrera':'barrera cutánea',
      'objetivo-textura':'textura',
      'sensibilidad-ninguna':'piel tolerante',
      'sensibilidad-reactiva':'piel reactiva',
      'sensibilidad-muy-reactiva':'piel muy reactiva',
      'preferencia-rutina-3':'una rutina de 3 pasos',
      'preferencia-rutina-4':'una rutina de 4 pasos',
      'preferencia-kit':'un kit enfocado'
    };
    return labels[tag]||tag.replace(/^(tipo-piel|objetivo|preferencia|sensibilidad)-/,'').replace(/-/g,' ');
  }

  function productTags(p){
    return String(p.match_tags||'').split(',').map(normalizeTag).filter(Boolean);
  }

  /* ── CAPA 2: preferencia de formato ── */
  function formatoPreferido(profile){
    if(profile.sensibilidad==='sensibilidad-muy-reactiva') return 'rutina';
    if(profile.nivel_rutina==='preferencia-kit') return 'kit';
    if(profile.nivel_rutina==='preferencia-rutina-3'||profile.nivel_rutina==='preferencia-rutina-4') return 'rutina';
    var sec=profile.objetivo_secundario;
    if(!sec||sec==='objetivo-ninguno') return 'rutina';
    return 'kit';
  }

  /* ── CAPA 3: cantidad de pasos dentro de las rutinas ── */
  function pasosPreferidos(profile){
    if(profile.nivel_rutina==='preferencia-rutina-3') return 3;
    if(profile.nivel_rutina==='preferencia-rutina-4') return 4;
    return 0;
  }

  /* ── CAPA 4: score ── */
  function scoreProduct(p, profile){
    var tags=productTags(p);
    var score=0, why=[];

    var prim=profile.objetivo_principal;
    if(prim&&prim!=='objetivo-ninguno'){
      var principalPrim='objetivo-principal-'+prim.replace('objetivo-','');
      if(tags.indexOf(principalPrim)!==-1){
        score+=W.PRINCIPAL_PRIMARIO; why.push({tag:prim,pts:W.PRINCIPAL_PRIMARIO,core:true});
      } else if(tags.indexOf(prim)!==-1){
        score+=W.SECUNDARIO_PRIMARIO; why.push({tag:prim,pts:W.SECUNDARIO_PRIMARIO,core:false});
      }
    }

    var sec=profile.objetivo_secundario;
    if(sec&&sec!=='objetivo-ninguno'){
      var principalSec='objetivo-principal-'+sec.replace('objetivo-','');
      if(tags.indexOf(principalSec)!==-1){
        score+=W.PRINCIPAL_SECUNDARIO; why.push({tag:sec,pts:W.PRINCIPAL_SECUNDARIO,core:false});
      } else if(tags.indexOf(sec)!==-1){
        score+=W.SECUNDARIO_SECUNDARIO; why.push({tag:sec,pts:W.SECUNDARIO_SECUNDARIO,core:false});
      }
    }

    var reactiva=(profile.sensibilidad==='sensibilidad-reactiva'||profile.sensibilidad==='sensibilidad-muy-reactiva');
    if(reactiva){
      if(tags.indexOf('intensidad-suave')!==-1) score+=W.SUAVE_REACTIVA;
      if(tags.indexOf('intensidad-alta')!==-1)  score+=W.ALTA_REACTIVA;
    }

    var especificidad=tags.filter(function(t){ return t.indexOf('tipo-piel-')===0; }).length;

    return Object.assign({},p,{
      _score:score,
      _why:why,
      _tags:tags,
      _especificidad:especificidad
    });
  }

  /* CAPA 5: desempate — más específico primero, luego orden de colección */
  function ranking(a,b){
    if(b._score!==a._score) return b._score-a._score;
    if(a._especificidad!==b._especificidad) return a._especificidad-b._especificidad;
    return (a.collection_order||0)-(b.collection_order||0);
  }

  function calculateRecommendation(it){
    var answers=state[it].answers;
    var profile=answersByRole(answers);
    var prods=DATA.products||[];

    /* CAPA 0 */
    var pool=prods.filter(function(p){ return p.quiz_tipo==='rutina'||p.quiz_tipo==='kit'; });

    /* CAPA 1 — filtro duro por tipo de piel */
    var filtrados=pool;
    if(profile.tipo_piel){
      filtrados=pool.filter(function(p){ return productTags(p).indexOf(profile.tipo_piel)!==-1; });
    }

    /* CAPA 2 — formato */
    var preferido=formatoPreferido(profile);
    var otro=preferido==='rutina'?'kit':'rutina';
    var pasosDeseados=pasosPreferidos(profile);
    var fallbackPasos=false;

    function rankFormato(fmt){
      var candidatos=filtrados.filter(function(p){ return p.quiz_tipo===fmt; });

      if(fmt==='rutina'&&pasosDeseados){
        var exactos=candidatos.filter(function(p){ return Number(p.routine_steps||0)===pasosDeseados; });
        if(exactos.length) candidatos=exactos;
        else if(candidatos.length) fallbackPasos=true;
      }

      return candidatos
        .map(function(p){ return scoreProduct(p,profile); })
        .sort(ranking);
    }

    var listaA=rankFormato(preferido);
    var listaB=[];
    var usado=preferido;
    var fallback=false;

    var formatoExplicito=!!profile.nivel_rutina;
    if(!listaA.length || (!formatoExplicito && listaA[0]._score < UMBRAL_PARCIAL)){
      listaB=rankFormato(otro);
      if(listaB.length && (!listaA.length || listaB[0]._score > (listaA[0]?listaA[0]._score:-999))){
        listaA=listaB; usado=otro; fallback=true;
      }
    }

    var top=listaA[0]||null;
    var best=null, confianza='ninguna';
    if(top && top._score>=UMBRAL_FUERTE){ best=top; confianza='fuerte'; }
    else if(top && top._score>=UMBRAL_PARCIAL){ best=top; confianza='parcial'; }
    else if(top){ best=top; confianza='base'; }

    /* Si recomendamos una rutina, preparamos la alternativa del otro tamaño. */
    var alternativaRutina=null;
    if(best&&best.quiz_tipo==='rutina'&&Number(best.routine_steps||0)){
      var pasosAlternativos=Number(best.routine_steps)===3?4:3;
      var alternativas=filtrados
        .filter(function(p){ return p.quiz_tipo==='rutina'&&Number(p.routine_steps||0)===pasosAlternativos; })
        .map(function(p){ return scoreProduct(p,profile); })
        .sort(ranking);
      alternativaRutina=alternativas[0]||null;
    }

    /* Complementos — sin filtro de formato, mismo score */
    var complementos=prods
      .filter(function(p){ return p.quiz_tipo==='complemento'; })
      .filter(function(p){ return !profile.tipo_piel || productTags(p).indexOf(profile.tipo_piel)!==-1; })
      .map(function(p){ return scoreProduct(p,profile); })
      .filter(function(p){ return p._score>0; })
      .sort(ranking)
      .slice(0,4);

    return {
      profile:profile,
      allTags:allAnswerTags(answers),
      best:best,
      confianza:confianza,
      formato:usado,
      formatoPreferido:preferido,
      fallback:fallback,
      pasosDeseados:pasosDeseados,
      pasosRecomendados:best&&best.quiz_tipo==='rutina'?Number(best.routine_steps||0):0,
      fallbackPasos:fallbackPasos,
      alternativaRutina:alternativaRutina,
      candidatos:listaA,
      poolFiltrado:filtrados.length,
      complementos:complementos
    };
  }

  function customerTags(rec){
    var tags=['quiz-skinland','quiz-completado','quiz-version-'+VERSION].concat(rec.allTags||[]);
    if(rec.best&&rec.best.handle) tags.push('quiz-resultado-'+rec.best.handle);
    tags.push('quiz-formato-'+(rec.formato||'ninguno'));
    if(rec.pasosDeseados) tags.push('quiz-preferencia-'+rec.pasosDeseados+'-pasos');
    if(rec.pasosRecomendados) tags.push('quiz-resultado-'+rec.pasosRecomendados+'-pasos');
    tags.push('quiz-confianza-'+(rec.confianza||'ninguna'));
    if(!rec.best) tags.push('quiz-sin-match');
    return unique(tags.filter(Boolean));
  }

  function validEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

  function withShopifyCaptcha(form,callback){
    if(window.Shopify&&window.Shopify.captcha&&typeof window.Shopify.captcha.protect==='function'){
      try{ window.Shopify.captcha.protect(form,function(){ callback(); }); return; }catch(e){}
    }
    callback();
  }

  function saveShopifySubscriber(name,email,tags){
    return new Promise(function(resolve){
      var wrapper=$id(QID+'-customer-form');
      var form=wrapper?wrapper.querySelector('form'):null;
      var frame=$id(QID+'-shopify-target');
      if(!form||!frame){ resolve(false); return; }

      var fn=form.querySelector('[name="contact[first_name]"]');
      var em=form.querySelector('[name="contact[email]"]');
      var tg=form.querySelector('[name="contact[tags]"]');
      if(fn) fn.value=(name||'').split(' ')[0];
      if(em) em.value=email;
      if(tg) tg.value=tags.join(',');

      var finished=false, timer=null;
      function done(ok){
        if(finished) return;
        finished=true;
        if(timer) clearTimeout(timer);
        frame.onload=null;
        resolve(ok);
      }
      frame.onload=function(){
        try{
          var path=frame.contentWindow.location.pathname||'';
          done(path.indexOf('/challenge')===-1);
        }catch(e){ done(true); }
      };
      form.setAttribute('target',frame.name);
      withShopifyCaptcha(form,function(){
        try{ form.submit(); timer=setTimeout(function(){ done(true); },5000); }
        catch(e){ done(false); }
      });
    });
  }

  function klaviyoConfigured(){
    var cap=DATA.capture||{};
    return !!(cap.klaviyo_public_key&&cap.klaviyo_list_id);
  }

  function klaviyoRequest(path,payload){
    var cap=DATA.capture||{};
    return fetch('https://a.klaviyo.com'+path+'?company_id='+encodeURIComponent(cap.klaviyo_public_key),{
      method:'POST',
      headers:{ 'content-type':'application/vnd.api+json', 'revision':'2026-04-15' },
      body:JSON.stringify(payload)
    }).then(function(r){
      if(!r.ok) return r.text().then(function(txt){ throw new Error(txt||('HTTP '+r.status)); });
      return true;
    });
  }

  function subscribeKlaviyo(name,email,rec){
    if(!klaviyoConfigured()) return Promise.resolve(false);
    var cap=DATA.capture||{};
    var pr=rec.profile||{};
    var best=rec.best||{};
    var properties={
      quiz_skin_type:(pr.tipo_piel||'').replace('tipo-piel-',''),
      quiz_primary_concern:(pr.objetivo_principal||'').replace('objetivo-',''),
      quiz_secondary_concern:(pr.objetivo_secundario||'').replace('objetivo-',''),
      quiz_sensitivity:(pr.sensibilidad||'').replace('sensibilidad-',''),
      quiz_routine_preference:pr.nivel_rutina||'',
      quiz_requested_steps:rec.pasosDeseados||0,
      quiz_recommended_steps:rec.pasosRecomendados||0,
      quiz_steps_fallback:!!rec.fallbackPasos,
      quiz_extra:pr.otros||[],
      quiz_format:rec.formato||'',
      quiz_confidence:rec.confianza||'',
      quiz_result_title:best.title||'',
      quiz_result_handle:best.handle||'',
      quiz_result_type:best.quiz_tipo||'',
      quiz_version:VERSION
    };

    var subscriptionPayload={
      data:{
        type:'subscription',
        attributes:{
          custom_source:'Skinland Quiz',
          profile:{ data:{ type:'profile', attributes:{
            email:email, first_name:name, properties:properties,
            subscriptions:{ email:{ marketing:{ consent:'SUBSCRIBED' } } }
          }}}
        },
        relationships:{ list:{ data:{ type:'list', id:cap.klaviyo_list_id } } }
      }
    };

    var eventPayload={
      data:{
        type:'event',
        attributes:{
          unique_id:'skin-quiz-'+Date.now()+'-'+Math.random().toString(36).slice(2,9),
          properties:{
            QuizVersion:VERSION,
            AnswerTags:rec.allTags||[],
            Format:rec.formato||'',
            FormatPreferred:rec.formatoPreferido||'',
            FormatFallback:!!rec.fallback,
            RoutinePreference:(pr.nivel_rutina||''),
            RequestedRoutineSteps:rec.pasosDeseados||0,
            RecommendedRoutineSteps:rec.pasosRecomendados||0,
            RoutineStepsFallback:!!rec.fallbackPasos,
            Confidence:rec.confianza||'',
            PoolSize:rec.poolFiltrado||0,
            RecommendedProductID:best.id||'',
            RecommendedProductHandle:best.handle||'',
            RecommendedProductTitle:best.title||'',
            RecommendedProductURL:best.absolute_url||best.url||'',
            RecommendedProductImage:best.image||'',
            RecommendedProductPrice:best.price||'',
            RecommendedProductComparePrice:best.compare_price||'',
            RecommendedProductType:best.quiz_tipo||'',
            RecommendationScore:best._score||0
          },
          metric:{ data:{ type:'metric', attributes:{ name:cap.klaviyo_event_name||'Skin Quiz Completed' } } },
          profile:{ data:{ type:'profile', attributes:{ email:email, first_name:name, properties:properties } } }
        }
      }
    };

    return klaviyoRequest('/client/subscriptions',subscriptionPayload)
      .then(function(){ return klaviyoRequest('/client/events',eventPayload); })
      .then(function(){ return true; })
      .catch(function(err){ console.error('[Skinland Quiz] Klaviyo:',err); return false; });
  }


  /* ── Estilo conversación (chat) ── */
  function esc(t){ return String(t==null?'':t).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function esChat(rootId){ return ESTILO==='chat' && instOf(rootId)==='inline'; }
  function chatNombre(){ return ROOT.dataset.chatNombre || 'Aly'; }
  function avatarTipo(){
    var q=''; try{ q=new URLSearchParams(window.location.search).get('avatar')||''; }catch(e){}
    var t=q||ROOT.dataset.chatAvatar||'1';
    if(t==='letra') return 'letra';
    t=String(t).replace('aly','');
    return ['1','2','3','4','5'].indexOf(t)!==-1?t:'1';
  }
  /* Avatares dibujados (no son fotos): 5 versiones de Aly. Parpadean, se balancean y mueven la boca mientras "escribe" */
  var AV_CARA='<ellipse class="av-cara" cx="50" cy="52" rx="23.5" ry="26"/>';
  var AV_RASGOS='<g class="av-ojos"><ellipse cx="40" cy="54" rx="3.3" ry="4.2"/><ellipse cx="60" cy="54" rx="3.3" ry="4.2"/><circle class="av-brilloojo" cx="41.3" cy="52.6" r="1.2"/><circle class="av-brilloojo" cx="61.3" cy="52.6" r="1.2"/></g><path class="av-pestana" d="M36.4 52.4l-2.2-1.6M63.6 52.4l2.2-1.6"/><path class="av-ceja" d="M34.5 46.5q5.5-3.2 11-1M54.5 45.5q5.5-2.2 11 1"/><ellipse class="av-rubor" cx="33.5" cy="61" rx="4.6" ry="2.6"/><ellipse class="av-rubor" cx="66.5" cy="61" rx="4.6" ry="2.6"/><path class="av-boca" d="M43.5 65q6.5 5.5 13 0"/>';
  var AV_CUERPO='<path class="av-ropa" d="M12 112c0-26 14-40 38-40s38 14 38 40z"/><path class="av-cuello" d="M42 64h16v13c-3 5-13 5-16 0z"/>';
  var AV_DESTELLOS='<g class="av-destellos"><path d="M10 16l1.5 3.4 3.4 1.5-3.4 1.5L10 26l-1.5-3.6L5 20.9l3.5-1.5z"/><path d="M91 54l1.2 2.7 2.7 1.2-2.7 1.2L91 62l-1.2-2.9-2.7-1.2 2.7-1.2z"/></g>';
  var AV={
    '1':{ atras:'<circle class="av-pelo" cx="26" cy="22" r="11"/><circle class="av-pelo" cx="74" cy="22" r="11"/><circle class="av-lazo" cx="26" cy="22" r="3.4"/><circle class="av-lazo" cx="74" cy="22" r="3.4"/><ellipse class="av-pelo" cx="50" cy="46" rx="31" ry="33"/><path class="av-pelo" d="M27 40c-3.5 13 .5 28 7 38c-2.5-12-3-26-1-38z"/><path class="av-pelo" d="M73 40c3.5 13-.5 28-7 38c2.5-12 3-26 1-38z"/>',
      frente:'<path class="av-pelo" d="M24.5 50C23.5 31 35 19.5 50 19.5S76.5 31 75.5 50C73 41 67 36.5 59 36C55 40.5 45 40.5 41 36C33 36.5 27 41 24.5 50z"/><path class="av-mecha" d="M46 24c-.5 4-2.5 7-5.5 9.5M54 24c.5 4 2.5 7 5.5 9.5"/>',
      extra:'<path class="av-estrella" d="M71 35l1.7 3.5 3.9.5-2.8 2.7.7 3.9-3.5-1.9-3.5 1.9.7-3.9-2.8-2.7 3.9-.5z"/>' },
    '2':{ atras:'<path class="av-pelo" d="M22 52c-3 22-1 38 5 52h46c6-14 8-30 5-52c-2-19-14-31-28-31s-26 12-28 31z"/>',
      frente:'<path class="av-pelo" d="M24.5 54C22.5 33 35 21 50 21s27.5 12 25.5 33C71 43 61 33 50 28C39 33 29 43 24.5 54z"/><path class="av-mecha" d="M50 26c-6 5-12 12-17 20"/>',
      extra:'<path class="av-cinta" d="M25.5 40q24.5-24 49 0"/><circle class="av-lazo" cx="68" cy="25" r="4"/><circle class="av-lazo" cx="74" cy="29" r="3"/>' },
    '3':{ atras:'<path class="av-pelo" d="M21 48c0-21 12-31 29-31s29 10 29 31v32h-9V52H30v28h-9z"/>',
      frente:'<path class="av-pelo" d="M25 51c-1-17 10-26 25-26s26 9 25 26c-9-1-17-4-25-4s-16 3-25 4z"/><path class="av-mecha" d="M38 30c-3 3-5 7-6 11M62 30c3 3 5 7 6 11"/>',
      extra:'<circle class="av-lente" cx="40" cy="54" r="8.6"/><circle class="av-lente" cx="60" cy="54" r="8.6"/><path class="av-lente" d="M48.6 53.5h2.8"/>' },
    '4':{ atras:'<g class="av-cola"><path class="av-pelo" d="M68 22c16 0 24 16 17 38c-1-11-5-18-14-21z"/></g><ellipse class="av-pelo" cx="50" cy="44" rx="29" ry="30"/>',
      frente:'<path class="av-pelo" d="M24.5 51C23.5 31 35 20.5 50 20.5S76.5 31 75.5 51C72 40 62 34 51 33C42 40 31 43 24.5 51z"/><path class="av-mecha" d="M52 24c-3 4-8 8-14 11"/>',
      extra:'<circle class="av-lazo" cx="68" cy="24" r="5"/><path class="av-estrella" d="M31 33l1.5 3.2 3.5.4-2.6 2.4.7 3.5-3.1-1.7-3.1 1.7.7-3.5-2.6-2.4 3.5-.4z"/>' },
    '5':{ atras:'<ellipse class="av-pelo" cx="50" cy="48" rx="31" ry="32"/><circle class="av-pelo" cx="23" cy="68" r="8"/><circle class="av-pelo" cx="77" cy="68" r="8"/><circle class="av-pelo" cx="30" cy="79" r="7"/><circle class="av-pelo" cx="70" cy="79" r="7"/>',
      frente:'<path class="av-pelo" d="M25 52C24 35 35 25 50 25c11 0 21 6 25 18C66 40 57 35 44 38C36 40 29 44 25 52z"/>',
      extra:'<path class="av-boina" d="M23 33C21 19 35 12 52 13c15 1 27 8 25 19C66 27 44 25 23 33z"/><circle class="av-boina" cx="52" cy="12" r="2.6"/>' }
  };
  function avatarHTML(tamano){
    var foto=ROOT.dataset.chatFoto, t=avatarTipo();
    if(foto) return '<span class="slqc-av slqc-av--'+tamano+' slqc-av--foto" aria-hidden="true"><img src="'+esc(foto)+'" alt=""></span>';
    if(t==='letra') return '<span class="slqc-av slqc-av--'+tamano+' slqc-av--letra" aria-hidden="true">'+esc(chatNombre().charAt(0))+'</span>';
    var v=AV[t];
    var S='<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g class="av-cuerpo">'+AV_CUERPO+'<g class="av-cabeza">'+v.atras+AV_CARA+v.frente+AV_RASGOS+v.extra+'</g></g>'+AV_DESTELLOS+'</svg>';
    return '<span class="slqc-av slqc-av--'+tamano+' slqc-av--v'+t+'" aria-hidden="true">'+S+'</span>';
  }
  function chatHora(){ var d=new Date(); return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2); }
  /* La ventana ocupa lo que queda de pantalla bajo el encabezado del sitio (y se ajusta con el teclado) */
  function chatMedir(){
    var w=$id(QID+'-wrap'), inl=$id(QID+'-inline-content'); if(!w||!inl) return;
    var alto=(window.visualViewport?window.visualViewport.height:window.innerHeight)-w.getBoundingClientRect().top;
    w.style.setProperty('--slqc-alto',Math.max(380,Math.floor(alto))+'px');
  }
  function chatKeep(rootId){
    var c=$id(rootId+'-cuerpo'); if(!c) return;
    c.scrollTo({ top:c.scrollHeight, behavior: SIN_MOVIMIENTO?'auto':'smooth' });
  }
  function chatHabla(rootId,on){
    var r=$id(rootId); if(r) r.classList.toggle('slqc--habla',!!on);
    var e=r&&r.querySelector('.slqc-estado'); if(!e) return;
    if(!e.dataset.base) e.dataset.base=e.textContent;
    e.textContent=on?T('chat_escribiendo','escribiendo…'):e.dataset.base;
  }
  function chatMsg(rootId,who,html){
    var h=$id(rootId+'-hilo'); if(!h) return null;
    var prev=h.lastElementChild;
    var d=document.createElement('div');
    d.className='slqc-msg slqc-msg--'+who+((prev&&prev.classList.contains('slqc-msg--'+who))?' slqc-msg--seguido':'');
    var hora=html.indexOf('slqc-escribiendo')===-1?'<span class="slqc-hora">'+chatHora()+(who==='yo'?' <b class="slqc-visto">✓✓</b>':'')+'</span>':'';
    d.innerHTML='<div class="slqc-burbuja">'+html+hora+'</div>';
    h.appendChild(d); chatKeep(rootId); return d;
  }
  function chatTyping(rootId,cb,ms){
    if(SIN_MOVIMIENTO){ cb(); return; }
    var d=chatMsg(rootId,'aly','<span class="slqc-escribiendo" aria-label="'+esc(chatNombre())+' está escribiendo"><i></i><i></i><i></i></span>');
    chatHabla(rootId,true);
    setTimeout(function(){ if(d&&d.parentNode) d.parentNode.removeChild(d); chatHabla(rootId,false); cb(); },ms||2200);
  }
  function chatProgress(rootId,done){
    var total=(DATA.steps||[]).length+1;
    var pf=$id(rootId+'-pf'), pl=$id(rootId+'-pl');
    if(pf) pf.style.width=Math.round((done/total)*100)+'%';
    if(pl) pl.textContent=Math.min(done+1,total)+' / '+total;
  }
  function chatBackBtn(rootId){ return '<button type="button" class="slqc-volver" onclick="'+NS+'Q.chatBack(\''+rootId+'\')">'+T('atras','← Atrás')+'</button>'; }
  function chatAsk(rootId,i,instant){
    var steps=DATA.steps||[], step=steps[i], it=instOf(rootId), tray=$id(rootId+'-bandeja');
    if(!step||!tray) return;
    state[it].cur=i; chatProgress(rootId,i); tray.innerHTML='';
    function show(){
      chatMsg(rootId,'aly','<strong>'+step.heading+'</strong>'+(step.sub?'<span class="slqc-sub">'+step.sub+'</span>':''));
      var H='<div class="slqc-resp-cab"><span>'+T('chat_responde','Tu respuesta')+'</span><span>'+T('chat_toca','Toca una opción')+' ↓</span></div><div class="slqc-ops'+(step.options.length>=4?' slqc-ops--muchas':'')+'" role="group" aria-label="'+esc(step.heading.replace(/<[^>]+>/g,''))+'">';
      step.options.forEach(function(opt,k){
        H+='<button type="button" class="slqc-op" onclick="'+NS+'Q.chatPick(\''+rootId+'\','+i+','+k+')"><span class="slqc-op__t">'+opt.label+'</span>'+(opt.desc?'<span class="slqc-op__d">'+opt.desc+'</span>':'')+'</button>';
      });
      H+='</div>';
      if(i>0) H+=chatBackBtn(rootId);
      tray.innerHTML=H; tray.scrollTop=0;
      chatKeep(rootId);
    }
    if(instant) show(); else chatTyping(rootId,show);
  }
  function chatCargarForm(){
    /* El formulario protegido con hCaptcha se carga recién al llegar al paso del correo, para que su insignia no aparezca antes */
    if($id(QID+'-customer-form')) return;
    var tpl=$id(QID+'-form-tpl'); if(!tpl||!tpl.content) return;
    document.body.appendChild(tpl.content.cloneNode(true));
  }
  function chatCapture(rootId,instant){
    chatCargarForm();
    var steps=DATA.steps||[], cap=DATA.capture||{}, it=instOf(rootId), tray=$id(rootId+'-bandeja');
    if(!tray) return;
    state[it].cur=steps.length; chatProgress(rootId,steps.length); tray.innerHTML='';
    function show(){
      chatMsg(rootId,'aly','<strong>'+(cap.heading||'¡Casi listo! Recibe tu rutina')+'</strong><span class="slqc-sub">'+(cap.sub||'Déjanos tu email para guardar y recibir tu recomendación.')+'</span>');
      var H='<div class="slqc-resp-cab"><span>'+T('chat_responde','Tu respuesta')+'</span><span>'+T('chat_escribe','Escribe tus datos')+' ↓</span></div><div class="slqc-form">';
      H+='<label for="'+rootId+'-name" class="slq-opt-label--dark">'+T('nombre','Nombre')+'</label>';
      H+='<input class="slq-input" type="text" id="'+rootId+'-name" placeholder="'+T('nombre_ph','Tu nombre')+'" autocomplete="given-name">';
      H+='<label for="'+rootId+'-em" class="slq-opt-label--dark">'+T('email','Email')+'</label>';
      H+='<input class="slq-input" type="email" id="'+rootId+'-em" placeholder="'+T('email_ph','tu@email.com')+'" autocomplete="email" inputmode="email">';
      H+='<label class="slq-consent"><input type="checkbox" id="'+rootId+'-consent-em" onchange="'+NS+'Q.onConsent(\''+rootId+'\',\'em\')"><span>'+(cap.consent_text||'Acepto recibir comunicaciones de Skinland. Me puedo dar de baja cuando quiera.')+'</span></label>';
      H+='<p class="slq-consent-error" id="'+rootId+'-consent-err-em">'+T('consent_error','Debes aceptar para continuar.')+'</p>';
      H+='<button class="slq-btn slq-btn--primary slqc-enviar" id="'+rootId+'-submit" onclick="'+NS+'Q.submitCapture(\''+rootId+'\')">'+T('ver_rutina','Ver mi rutina →')+'</button>';
      H+='<button class="slq-skip" onclick="'+NS+'Q.showResults(\''+rootId+'\',null)">'+T('sin_datos','Ver resultados sin dejar datos')+'</button>';
      H+='</div>'+chatBackBtn(rootId);
      tray.innerHTML=H; tray.scrollTop=0;
      chatKeep(rootId);
    }
    if(instant) show(); else chatTyping(rootId,show);
  }
  function chatStart(rootId){
    var it=instOf(rootId), h=$id(rootId+'-hilo'), tray=$id(rootId+'-bandeja');
    state[it]={cur:0,answers:{}};
    if(h) h.innerHTML=''; if(tray) tray.innerHTML='';
    chatProgress(rootId,0);
    var saludo=ROOT.dataset.chatSaludo;
    function primera(){ if((DATA.steps||[]).length) chatAsk(rootId,0,SIN_MOVIMIENTO); }
    if(!saludo){ primera(); return; }
    chatTyping(rootId,function(){ chatMsg(rootId,'aly',esc(saludo)); setTimeout(primera,SIN_MOVIMIENTO?0:1200); },1600);
  }
  function buildChatHTML(rootId){
    var total=(DATA.steps||[]).length+1;
    var salir=ROOT.dataset.chatSalir||'/';
    var H='<div class="slq-root slqc" id="'+rootId+'">';
    H+='<div class="slqc-top"><a class="slqc-salir" href="'+esc(salir)+'" aria-label="Salir del test"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></a>'+avatarHTML('grande')+'<div class="slqc-quien"><strong>'+esc(chatNombre())+'</strong><span class="slqc-estado">'+T('chat_rol','Asistente de Skinland')+'</span></div><span class="slq-prog-label" id="'+rootId+'-pl">1 / '+total+'</span></div>';
    H+='<div class="slq-prog-bar slqc-barra"><div class="slq-prog-fill" id="'+rootId+'-pf" style="width:0%"></div></div>';
    H+='<div class="slqc-cuerpo" id="'+rootId+'-cuerpo">';
    H+='<div class="slqc-hilo" id="'+rootId+'-hilo" role="log" aria-live="polite"></div>';
    H+='<div class="slq-results" id="'+rootId+'-res"><div class="slq-results-hdr">';
    H+='<h2 class="slq-results-heading">'+DATA.results.heading+'</h2><p class="slq-results-sub">'+DATA.results.sub+'</p></div>';
    H+='<div id="'+rootId+'-success"></div><div id="'+rootId+'-rc"></div>';
    H+='<button class="slq-restart" onclick="'+NS+'Q.restart(\''+rootId+'\')">'+T('reiniciar','Empezar de nuevo')+'</button>';
    H+='</div></div>';
    H+='<div class="slqc-bandeja" id="'+rootId+'-bandeja"></div></div>';
    return H;
  }

  function buildHTML(rootId){
    if(esChat(rootId)) return buildChatHTML(rootId);
    var steps=DATA.steps||[], cap=DATA.capture||{}, total=steps.length+1;
    var H='<div class="slq-root" id="'+rootId+'">';
    H+='<div class="slq-prog-wrap"><div class="slq-prog-bar"><div class="slq-prog-fill" id="'+rootId+'-pf" style="width:'+pct(0,total)+'%"></div></div><span class="slq-prog-label" id="'+rootId+'-pl">1 / '+total+'</span></div>';

    steps.forEach(function(step,i){
      H+='<div class="slq-step'+(i===0?' slq-step--active':'')+'" id="'+rootId+'-s'+i+'">';
      if(step.image) H+='<div class="slq-q-media"><img src="'+step.image+'" alt="'+(step.image_alt||'')+'" loading="lazy"></div>';
      if(step.video_url&&step.video_url.trim()){
        var sv=step.video_url.replace(/"/g,'&quot;');
        H+='<button class="slq-video-btn" onclick="'+NS+'Q.openVideo(\''+sv+'\')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>'+(step.video_label||'Ver video')+'</button>';
      }
      H+='<h2 class="slq-q-heading">'+step.heading+'</h2>';
      if(step.sub) H+='<p class="slq-q-sub">'+step.sub+'</p>';
      var hasImg=step.options.some(function(o){ return !!o.image; });
      var cols=!hasImg?'slq-options--list':(step.options.length>=5?'slq-options--3':'');
      H+='<div class="slq-options '+cols+'">';
      step.options.forEach(function(opt){
        var hi=!!opt.image, cc=hi?'slq-opt-card':'slq-opt-card slq-opt-card--no-img';
        H+='<label class="slq-opt"><input type="radio" name="'+rootId+'-q'+i+'" value="'+opt.tag+'" onchange="'+NS+'Q.onSel(event,'+i+',\''+rootId+'\')">';
        H+='<div class="'+cc+'">';
        if(hi){
          H+='<img class="slq-opt-img" src="'+opt.image+'" alt="'+(opt.image_alt||opt.label)+'" loading="lazy"><div class="slq-opt-overlay"></div><div class="slq-opt-label-wrap"><span class="slq-opt-label">'+opt.label+'</span></div>';
        } else {
          H+='<div class="slq-opt-label-wrap slq-opt-label-wrap--centered"><span class="slq-opt-label--dark">'+opt.label+'</span>';
          if(opt.desc) H+='<span class="slq-opt-desc">'+opt.desc+'</span>';
          H+='</div>';
        }
        H+='</div><span class="slq-opt-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></label>';
      });
      H+='</div>';
      H+='<div class="slq-nav">';
      H+=i>0?'<button class="slq-btn slq-btn--back" onclick="'+NS+'Q.prev(\''+rootId+'\')">'+T('atras','← Atrás')+'</button>':'<span></span>';
      H+='<button class="slq-btn slq-btn--primary" id="'+rootId+'-nb'+i+'" disabled onclick="'+NS+'Q.next('+i+',\''+rootId+'\')">'+T('siguiente','Siguiente →')+'</button>';
      H+='</div></div>';
    });

    /* Paso captura */
    var ei=steps.length;
    H+='<div class="slq-step" id="'+rootId+'-s'+ei+'">';
    H+='<h2 class="slq-q-heading">'+(cap.heading||'¡Casi listo! Recibe tu rutina')+'</h2>';
    H+='<p class="slq-q-sub">'+(cap.sub||'Déjanos tu email para guardar y recibir tu recomendación.')+'</p>';
    H+='<div class="slq-capture">';
    H+='<label for="'+rootId+'-name" class="slq-opt-label--dark">'+T('nombre','Nombre')+'</label>';
    H+='<input class="slq-input" type="text" id="'+rootId+'-name" placeholder="'+T('nombre_ph','Tu nombre')+'" autocomplete="given-name">';
    H+='<label for="'+rootId+'-em" class="slq-opt-label--dark">'+T('email','Email')+'</label>';
    H+='<input class="slq-input" type="email" id="'+rootId+'-em" placeholder="'+T('email_ph','tu@email.com')+'" autocomplete="email" inputmode="email">';
    H+='<div class="slq-benefit"><span class="slq-benefit-dot"></span>'+(cap.benefit_1||'Recibe tu rutina personalizada al instante')+'</div>';
    H+='<div class="slq-benefit"><span class="slq-benefit-dot"></span>'+(cap.benefit_2||'Guarda tu recomendación para revisarla después')+'</div>';
    H+='<div class="slq-benefit"><span class="slq-benefit-dot"></span>'+(cap.benefit_3||'Consejos de Skinland según tu perfil')+'</div>';
    H+='<label class="slq-consent"><input type="checkbox" id="'+rootId+'-consent-em" onchange="'+NS+'Q.onConsent(\''+rootId+'\',\'em\')"><span>'+(cap.consent_text||'Acepto recibir comunicaciones de Skinland. Me puedo dar de baja cuando quiera.')+'</span></label>';
    H+='<p class="slq-consent-error" id="'+rootId+'-consent-err-em">'+T('consent_error','Debes aceptar para continuar.')+'</p>';
    H+='</div>';
    H+='<div class="slq-nav"><button class="slq-btn slq-btn--back" onclick="'+NS+'Q.prev(\''+rootId+'\')">'+T('atras','← Atrás')+'</button><button class="slq-btn slq-btn--primary" id="'+rootId+'-submit" onclick="'+NS+'Q.submitCapture(\''+rootId+'\')">'+T('ver_rutina','Ver mi rutina →')+'</button></div>';
    H+='<button class="slq-skip" onclick="'+NS+'Q.showResults(\''+rootId+'\',null)">'+T('sin_datos','Ver resultados sin dejar datos')+'</button>';
    H+='</div>';

    /* Resultados */
    H+='<div class="slq-results" id="'+rootId+'-res"><div class="slq-results-hdr">';
    H+='<h2 class="slq-results-heading">'+DATA.results.heading+'</h2>';
    H+='<p class="slq-results-sub">'+DATA.results.sub+'</p></div>';
    H+='<div id="'+rootId+'-success"></div><div id="'+rootId+'-rc"></div>';
    H+='<button class="slq-restart" onclick="'+NS+'Q.restart(\''+rootId+'\')">'+T('reiniciar','Empezar de nuevo')+'</button>';
    H+='</div></div>';
    return H;
  }

  window[NS+'Q'] = {
    openVideo: function(url){
      if(!url||!url.trim()) return;
      var modal=$id(QID+'-video-modal'), frame=$id(QID+'-video-frame');
      if(!modal||!frame) return;
      frame.src=embed(url); modal.removeAttribute('hidden'); document.body.style.overflow='hidden';
    },
    closeVideo: function(){
      var modal=$id(QID+'-video-modal'), frame=$id(QID+'-video-frame');
      if(frame) frame.src='';
      if(modal) modal.setAttribute('hidden','');
      document.body.style.overflow='';
    },
    closeModal: function(){
      var m=$id(QID+'-modal');
      if(m){ m.setAttribute('hidden',''); document.body.style.overflow=''; }
    },
    openQuizModal: function(){
      var m=$id(QID+'-modal'); if(!m) return;
      state.modal={cur:0,answers:{}};
      var mc=$id(QID+'-modal-content'); if(mc) mc.innerHTML=buildHTML(QID+'-modal');
      m.removeAttribute('hidden'); document.body.style.overflow='hidden';
    },
    chatPick: function(rootId,i,k){
      var steps=DATA.steps||[], step=steps[i], it=instOf(rootId), tray=$id(rootId+'-bandeja');
      if(!step||!step.options[k]) return;
      var opt=step.options[k];
      if(tray) tray.innerHTML='';
      chatMsg(rootId,'yo',opt.label);
      state[it].answers[step.id]=[opt.tag];
      var reply=(step.replies||{})[opt.tag];
      function seguir(){ if(i<steps.length-1) chatAsk(rootId,i+1); else chatCapture(rootId); }
      if(reply) chatTyping(rootId,function(){ chatMsg(rootId,'aly',esc(reply)); setTimeout(seguir,SIN_MOVIMIENTO?0:Math.min(5000,Math.max(2200,reply.length*45))); },2200);
      else seguir();
    },
    chatBack: function(rootId){
      var steps=DATA.steps||[], it=instOf(rootId), h=$id(rootId+'-hilo');
      var target=Math.max(0,Math.min(state[it].cur,steps.length)-1);
      for(var j=target;j<steps.length;j++) delete state[it].answers[steps[j].id];
      if(h) h.innerHTML='';
      var saludo=ROOT.dataset.chatSaludo; if(saludo) chatMsg(rootId,'aly',esc(saludo));
      for(var n=0;n<target;n++){
        var st=steps[n], tag=(state[it].answers[st.id]||[])[0], lab='';
        st.options.forEach(function(o){ if(o.tag===tag) lab=o.label; });
        chatMsg(rootId,'aly','<strong>'+st.heading+'</strong>'+(st.sub?'<span class="slqc-sub">'+st.sub+'</span>':''));
        chatMsg(rootId,'yo',lab);
        var rp=(st.replies||{})[tag]; if(rp) chatMsg(rootId,'aly',esc(rp));
      }
      chatAsk(rootId,target,true);
    },
    onConsent: function(rootId,panel){
      var cb=$id(rootId+'-consent-'+panel), err=$id(rootId+'-consent-err-'+panel);
      if(cb&&cb.checked&&err) err.classList.remove('show');
    },
    onSel: function(e,stepIdx,rootId){
      var any=document.querySelector('input[name="'+rootId+'-q'+stepIdx+'"]:checked');
      var nb=$id(rootId+'-nb'+stepIdx); if(nb) nb.disabled=!any;
    },
    next: function(i,rootId){
      var steps=DATA.steps||[], step=steps[i], it=instOf(rootId);
      var inputs=document.querySelectorAll('input[name="'+rootId+'-q'+i+'"]:checked');
      if(!inputs.length) return;
      var vals=[]; inputs.forEach(function(inp){ vals.push(inp.value); });
      if(step) state[it].answers[step.id]=vals;
      this._go(i===steps.length-1?steps.length:i+1,rootId);
    },
    prev: function(rootId){
      var it=instOf(rootId), steps=DATA.steps||[];
      var resEl=$id(rootId+'-res');
      if(resEl&&resEl.classList.contains('slq-results--on')){
        resEl.classList.remove('slq-results--on'); this._go(steps.length,rootId); return;
      }
      if(state[it].cur>0){
        var prevIdx=state[it].cur-1; this._go(prevIdx,rootId);
        setTimeout(function(){ restoreAnswers(prevIdx,rootId,it); },50);
      }
    },
    _go: function(idx, rootId){
  var it = instOf(rootId);
  var steps = DATA.steps || [];
  var total = steps.length + 1;

  var oldEl = $id(rootId + '-s' + state[it].cur);
  if(oldEl) {
    oldEl.classList.remove('slq-step--active');
  }

  state[it].cur = idx;

  var newEl = $id(rootId + '-s' + state[it].cur);
  if(newEl) {
    newEl.classList.add('slq-step--active');
  }

  var pf = $id(rootId + '-pf');
  var pl = $id(rootId + '-pl');

  if(pf) {
    pf.style.width = pct(state[it].cur, total) + '%';
  }

  if(pl) {
    pl.textContent = (state[it].cur + 1) + ' / ' + total;
  }

  /* Solo mover scroll dentro del modal.
     En el quiz de página NO movemos la pantalla. */
  if(it === 'modal') {
    requestAnimationFrame(function(){
      scrollTop(rootId);
    });
  }
},

    submitCapture: function(rootId){
      var it=instOf(rootId);
      var nameEl=$id(rootId+'-name'), emEl=$id(rootId+'-em');
      var name=nameEl?nameEl.value.trim():'';
      var email=emEl?emEl.value.trim():'';
      var cb=$id(rootId+'-consent-em'), err=$id(rootId+'-consent-err-em');

      if(!name){ if(nameEl){ nameEl.classList.add('error'); nameEl.focus(); } return; }
      if(nameEl) nameEl.classList.remove('error');
      if(!validEmail(email)){ if(emEl){ emEl.classList.add('error'); emEl.focus(); } return; }
      if(emEl) emEl.classList.remove('error');
      if(!cb||!cb.checked){ if(err) err.classList.add('show'); if(cb) cb.focus(); return; }
      if(err) err.classList.remove('show');

      var rec=calculateRecommendation(it);
      var tags=customerTags(rec);
      var btn=$id(rootId+'-submit');
      if(btn){ btn.disabled=true; btn.textContent=T('guardando','Guardando...'); }

      var self=this;
      saveShopifySubscriber(name,email,tags)
      .then(function(shopifyOk){
        return subscribeKlaviyo(name,email,rec)
          .then(function(klaviyoOk){ return [shopifyOk,klaviyoOk]; })
          .catch(function(){ return [shopifyOk,false]; });
      })
      .then(function(results){
        if(btn){ btn.disabled=false; btn.textContent=T('ver_rutina','Ver mi rutina →'); }
        self.showResults(rootId,{ name:name, email:email, shopifyOk:!!results[0], klaviyoOk:!!results[1] });
      })
      .catch(function(){
        if(btn){ btn.disabled=false; btn.textContent=T('ver_rutina','Ver mi rutina →'); }
        self.showResults(rootId,{ name:name, email:email, shopifyOk:false, klaviyoOk:false });
      });
    },
    showResults: function(rootId,status){
      NOMBRE=(status&&status.name?status.name.split(' ')[0]:'')||NOMBRE||'';
      var it=instOf(rootId), steps=DATA.steps||[], total=steps.length+1;
      for(var i=0;i<=total;i++){ var s=$id(rootId+'-s'+i); if(s) s.classList.remove('slq-step--active'); }

      var pf=$id(rootId+'-pf'), pl=$id(rootId+'-pl');
      if(pf) pf.style.width='100%';
      if(pl) pl.textContent='✓ Listo';

      var res=$id(rootId+'-res');
      if(res) res.classList.add('slq-results--on');
      var rootEl=$id(rootId); if(rootEl&&esChat(rootId)) rootEl.classList.add('slqc--fin');

      var sc=$id(rootId+'-success');
      if(sc) sc.innerHTML='';

      if(sc&&status){
        var who=status.name?', '+status.name.split(' ')[0]:'';
        var msg='';
        if(status.klaviyoOk&&(DATA.capture||{}).email_flow_active){
          msg='Tu recomendación fue registrada y la enviaremos a <strong>'+status.email+'</strong>. Revisa también promociones o spam.';
        }else if(status.shopifyOk||status.klaviyoOk){
          msg='Guardamos tu perfil correctamente con el email <strong>'+status.email+'</strong>. Tu recomendación aparece a continuación.';
        }else{
          msg='Tu recomendación está lista, pero no pudimos confirmar el registro del email. Intenta nuevamente más tarde.';
        }
        if((DATA.capture||{}).debug_mode){
          msg+='<small style="display:block;margin-top:8px;opacity:.65">Prueba técnica — Shopify: '+(status.shopifyOk?'OK':'ERROR')+' · Klaviyo: '+(status.klaviyoOk?'OK':'NO CONFIGURADO / ERROR')+'</small>';
        }
        sc.innerHTML='<div class="slq-success-msg"><strong>✓ ¡Listo'+who+'!</strong>'+msg+'</div>';
      }

      var hd=document.querySelector('#'+rootId+'-res .slq-results-heading'), sb=document.querySelector('#'+rootId+'-res .slq-results-sub');
      if(hd) hd.innerHTML=conNombre(DATA.results.heading); if(sb) sb.innerHTML=conNombre(DATA.results.sub);
      var rc=$id(rootId+'-rc');
      if(rc) rc.innerHTML=this._calcResults(it);
      scrollTop(rootId);
    },
    _calcResults: function(it){
      var rec=calculateRecommendation(it);
      var best=rec.best;
      var R=DATA.results||{};
      var H='';

      if(best){
        H+='<div class="slq-kit">';
        if(best.image) H+='<img src="'+best.image+'" alt="'+best.alt+'" loading="lazy">';
        H+='<div class="slq-kit-body">';
        var resultTag = 'Rutina recomendada';

if(best.quiz_tipo === 'kit'){
  resultTag = 'Kit recomendado';
}
else if(best.quiz_tipo === 'rutina' && Number(best.routine_steps) === 3){
  resultTag = 'Rutina recomendada';
}
else if(best.quiz_tipo === 'rutina' && Number(best.routine_steps) === 4){
  resultTag = 'Rutina recomendada';
}
        H+='<p class="slq-kit-tag">'+resultTag+'</p>';
        H+='<h3 class="slq-kit-title">'+best.title+'</h3>';

        var razones=(best._why||[]).map(function(w){ return humanTag(w.tag); });
        var whyTxt;
        if(rec.confianza==='fuerte')       whyTxt=(R.copy_fuerte||'La elegimos porque está formulada exactamente para tu perfil.');
        else if(rec.confianza==='parcial') whyTxt=(R.copy_parcial||'Es lo más cercano a tu perfil dentro de lo que tenemos hoy.');
        else                               whyTxt=(R.copy_base||'No tenemos una rutina formulada para ese objetivo, pero esta es la base correcta para tu tipo de piel. Escríbenos y vemos qué sumarle.');
        if(rec.confianza!=='base'){
          if(razones.length===1) whyTxt+=' Se enfoca en '+razones[0]+'.';
          else if(razones.length>1) whyTxt+=' Se enfoca en '+razones[0]+', y de paso en '+razones.slice(1).join(', ')+'.';
        }
        H+='<p class="slq-kit-why">'+conNombre(whyTxt)+'</p>';

        if(best.description) H+='<p class="slq-kit-desc">'+best.description+'</p>';

        H+='<div class="slq-kit-foot"><div class="slq-kit-prices">';
        H+='<span class="slq-kit-price">'+best.price+'</span>';
        if(best.suma&&best.ahorro){
          H+='<span class="slq-kit-compare">'+T('por_separado','Por separado')+' <s>'+best.suma+'</s></span>';
        }
        H+='</div>';
        if(best.suma&&best.ahorro) H+='<p class="slq-kit-ahorro"><span class="sl-sticker">'+T('ahorras','Ahorras [ahorro]').replace('[ahorro]',best.ahorro)+'</span></p>';
        H+='<a href="'+best.url+'" class="slq-kit-btn" data-quiz-result="'+best.handle+'">'+T('ver_recomendacion','Ver recomendación →')+'</a>';
        H+='</div></div></div>';

        if(rec.alternativaRutina){
          var alt=rec.alternativaRutina;
          H+='<div class="slq-routine-alt">';
          H+='<div class="slq-routine-alt-copy"><span class="slq-routine-alt-label">También puedes elegir</span>';
          H+='<strong class="slq-routine-alt-title">Rutina de '+alt.routine_steps+' pasos</strong>';
          H+='<span class="slq-routine-alt-price">'+alt.price+'</span></div>';
          H+='<a class="slq-routine-alt-btn" href="'+alt.url+'">Ver alternativa →</a></div>';
        }
      } else {
        H+='<div class="slq-no-results">';
        H+='<h3>'+(R.no_match_heading||'Tu perfil necesita algo más específico')+'</h3>';
        H+='<p>'+(R.no_match_text||'Con tus respuestas no encontramos una rutina o kit que calce del todo.')+'</p>';
        H+='<a href="'+(R.no_match_url||'/collections/all')+'">'+(R.no_match_cta||'Explorar productos →')+'</a>';
        H+='</div>';
      }

      if(rec.complementos.length){
        H+='<p class="slq-prods-label">Complementos opcionales para tu perfil</p>';
        H+='<div class="slq-prods-grid">';
        rec.complementos.forEach(function(p,idx){
          H+='<a href="'+p.url+'" class="slq-prod">';
          if(p.image) H+='<img class="slq-prod-media" src="'+p.image+'" alt="'+p.alt+'" loading="lazy">';
          H+='<div class="slq-prod-info">';
          if(idx===0) H+='<span class="slq-prod-badge">Mejor match</span>';
          H+='<p class="slq-prod-vendor">'+(p.vendor||'Skinland')+'</p>';
          H+='<p class="slq-prod-name">'+p.title+'</p>';
          H+='<div class="slq-prod-prices">';
          H+='<span class="slq-prod-price">'+p.price+'</span>';
          H+='</div></div></a>';
        });
        H+='</div>';
      }

      if(R.wa_url){
        H+='<div class="slq-wa"><strong class="slq-wa__t">'+conNombre(R.wa_titulo||'')+'</strong><p class="slq-wa__p">'+conNombre(R.wa_texto||'')+'</p><a class="slq-btn slq-btn--primary slq-wa__b" href="'+esc(R.wa_url)+'" target="_blank" rel="noopener">'+esc(R.wa_boton||'WhatsApp')+'</a></div>';
      }

      if((DATA.capture||{}).debug_mode){
        var pr=rec.profile||{};
        var dbg='MOTOR v14 — diagnóstico\n';
        dbg+='tipo de piel      : '+(pr.tipo_piel||'—')+'\n';
        dbg+='objetivo principal: '+(pr.objetivo_principal||'—')+'\n';
        dbg+='objetivo secund.  : '+(pr.objetivo_secundario||'—')+'\n';
        dbg+='sensibilidad      : '+(pr.sensibilidad||'—')+'\n';
        dbg+='preferencia       : '+(pr.nivel_rutina||'—')+'\n';
        dbg+='formato preferido : '+rec.formatoPreferido+(rec.fallback?' → fallback a '+rec.formato:'')+'\n';
        dbg+='pasos solicitados : '+(rec.pasosDeseados||'—')+(rec.fallbackPasos?' → no disponibles, se usó fallback':'')+'\n';
        dbg+='pasos resultado   : '+(rec.pasosRecomendados||'—')+'\n';
        dbg+='pool tras filtro  : '+rec.poolFiltrado+' producto(s)\n';
        dbg+='confianza         : '+rec.confianza+'\n\n';
        dbg+='ranking:\n';
        (rec.candidatos||[]).forEach(function(c,i){
          dbg+='  '+(i+1)+'. '+c.title+'  ['+c.quiz_tipo+']  score '+c._score+'  esp '+c._especificidad+'\n';
          (c._why||[]).forEach(function(w){ dbg+='       +'+w.pts+'  '+w.tag+(w.core?'  (principal)':'')+'\n'; });
        });
        if(!(rec.candidatos||[]).length) dbg+='  (ninguno sobrevivió al filtro de tipo de piel + formato)\n';
        H+='<div class="slq-debug">'+dbg.replace(/</g,'&lt;')+'</div>';
      }

      return H;
    },
    restart: function(rootId){
      if(esChat(rootId)){
        var rEl=$id(rootId); if(rEl) rEl.classList.remove('slqc--fin');
        var sc0=$id(rootId+'-success'), res0=$id(rootId+'-res');
        if(sc0) sc0.innerHTML=''; if(res0) res0.classList.remove('slq-results--on');
        chatStart(rootId); return;
      }
      var it=instOf(rootId); state[it]={cur:0,answers:{}};
      document.querySelectorAll('input[name^="'+rootId+'-q"]').forEach(function(inp){ inp.checked=false; });
      var steps=DATA.steps||[]; steps.forEach(function(_,i){ var b=$id(rootId+'-nb'+i); if(b) b.disabled=true; });
      ['name','em'].forEach(function(k){ var el=$id(rootId+'-'+k); if(el){ el.value=''; el.classList.remove('error'); }});
      var cbEl=$id(rootId+'-consent-em'); if(cbEl) cbEl.checked=false;
      var errEl=$id(rootId+'-consent-err-em'); if(errEl) errEl.classList.remove('show');
      var sc=$id(rootId+'-success'), res=$id(rootId+'-res');
      if(sc) sc.innerHTML=''; if(res) res.classList.remove('slq-results--on');
      this._go(0,rootId);
    }
  };

  function init(){
    try { DATA=JSON.parse($id(QID+'-data').textContent); }
    catch(e){ DATA={steps:[],products:[],capture:{},results:{heading:'Resultados',sub:''}}; }
    var inlineEl=$id(QID+'-inline-content');
    if(inlineEl){
      state.inline={cur:0,answers:{}}; inlineEl.innerHTML=buildHTML(QID+'-inline');
      if(ESTILO==='chat'){
        if(ROOT.dataset.flotante==='1'){
          document.documentElement.classList.add('slqc-bloqueado'); window.scrollTo(0,0);
          chatMedir(); window.addEventListener('resize',chatMedir);
          if(window.visualViewport) window.visualViewport.addEventListener('resize',chatMedir);
        }
        chatStart(QID+'-inline');
      }
      if(ESTILO==='pantalla'){
        var pendiente=false;
        inlineEl.addEventListener('click',function(e){
          var lab=e.target.closest?e.target.closest('.slq-opt'):null; if(!lab) return;
          var inp=lab.querySelector('input'), m=inp&&inp.name.match(/-q(\d+)$/); if(!m||pendiente) return;
          var idx=+m[1]; pendiente=true;
          setTimeout(function(){
            pendiente=false;
            if(state.inline.cur===idx&&document.querySelector('input[name="'+QID+'-inline-q'+idx+'"]:checked')) window[NS+'Q'].next(idx,QID+'-inline');
          },SIN_MOVIMIENTO?0:280);
        });
      }
    }
    var modalEl=$id(QID+'-modal-content');
    if(modalEl){ state.modal={cur:0,answers:{}}; modalEl.innerHTML=buildHTML(QID+'-modal'); }
    document.querySelectorAll('[data-open-quiz="'+QID+'"]').forEach(function(btn){
      btn.addEventListener('click',function(e){ e.preventDefault(); window[NS+'Q'].openQuizModal(); });
    });
  }

  document.addEventListener('DOMContentLoaded',init);
  document.addEventListener('shopify:section:load',function(e){
    if(e.detail&&e.detail.sectionId===ROOT.dataset.sectionId) init();
  });
})();
