(function() {
  const crossCases = [
    'hdtf12_to_hdtf1_k4_cross_act',
    'hdtf14_to_hdtf7_k4_cross_act',
    'hdtf2_to_hdtf11_k4_cross_act',
    'hdtf3_to_hdtf4_k4_cross_act',
    'hdtf5_to_hdtf15_k4_cross_act',
    'hdtf8_to_hdtf13_k4_cross_act',
    'hdtf9_to_hdtf10_k4_cross_act',
    'vfhq1042_to_vfhq441_k4_cross_act',
    'vfhq25_to_vfhq16_k4_cross_act',
    'vfhq26_to_vfhq18_k4_cross_act',
    'vfhq31_to_vfhq6_k4_cross_act',
    'vfhq33_to_vfhq39_k4_cross_act',
    'vfhq38_to_vfhq50_k4_cross_act',
    'vfhq43_to_vfhq17_k4_cross_act',
    'vfhq45_to_vfhq1_k4_cross_act',
    'vfhq48_to_vfhq35_k4_cross_act',
    'vfhq501_to_vfhq665_k4_cross_act',
    'vfhq534_to_vfhq880_k4_cross_act',
    'vfhq8_to_vfhq12_k4_cross_act',
    'vfhq968_to_vfhq1085_k4_cross_act'
  ];

  const selfCases = [
    'self_hdtf10_k4_cross_act',
    'self_hdtf14_k4_cross_act',
    'self_hdtf1_k4_cross_act',
    'self_hdtf2_k4_cross_act',
    'self_hdtf6_k4_cross_act',
    'self_hdtf7_k4_cross_act',
    'self_vfhq1002_k4_cross_act',
    'self_vfhq1130_k4_cross_act',
    'self_vfhq1158_k4_cross_act',
    'self_vfhq21_k4_cross_act',
    'self_vfhq31_k4_cross_act',
    'self_vfhq32_k4_cross_act',
    'self_vfhq37_k4_cross_act',
    'self_vfhq44_k4_cross_act',
    'self_vfhq47_k4_cross_act',
    'self_vfhq49_k4_cross_act',
    'self_vfhq653_k4_cross_act',
    'self_vfhq686_k4_cross_act',
    'self_vfhq8_k4_cross_act'
  ];

  const featuredOrder = [
    ['cross', 'hdtf12_to_hdtf1_k4_cross_act'],
    ['self', 'self_hdtf1_k4_cross_act'],
    ['cross', 'vfhq1042_to_vfhq441_k4_cross_act'],
    ['self', 'self_vfhq1002_k4_cross_act'],
    ['cross', 'vfhq501_to_vfhq665_k4_cross_act'],
    ['self', 'self_vfhq686_k4_cross_act']
  ];

  function formatIdentity(rawId) {
    if (rawId.indexOf('hdtf') === 0) {
      return 'HDTF ' + rawId.slice(4);
    }
    if (rawId.indexOf('vfhq') === 0) {
      return 'VFHQ ' + rawId.slice(4);
    }
    return rawId.replace(/_/g, ' ').toUpperCase();
  }

  function buildCrossCase(caseId) {
    const match = caseId.match(/^(.+)_to_(.+)_k4_cross_act$/);
    const sourceId = formatIdentity(match[1]);
    const targetId = formatIdentity(match[2]);

    return {
      id: caseId,
      mode: 'cross',
      title: sourceId + ' to ' + targetId,
      subtitle: 'Cross-identity reenactment',
      note: 'Four source images drive an unseen target identity.',
      sourceId: sourceId,
      targetId: targetId,
      video: 'videos/cross/' + caseId + '/comparison.mp4'
    };
  }

  function buildSelfCase(caseId) {
    const match = caseId.match(/^self_(.+)_k4_cross_act$/);
    const targetId = formatIdentity(match[1]);

    return {
      id: caseId,
      mode: 'self',
      title: targetId + ' self-driven',
      subtitle: 'Self reenactment',
      note: 'Identity and driving motion are sourced from the same sequence.',
      sourceId: targetId,
      targetId: targetId,
      video: 'videos/self/' + caseId + '/comparison.mp4'
    };
  }

  function buildCase(mode, caseId) {
    return mode === 'cross' ? buildCrossCase(caseId) : buildSelfCase(caseId);
  }

  const collections = {
    "cross": crossCases.map(function(caseId) {
      return buildCase('cross', caseId);
    }),
    "self": selfCases.map(function(caseId) {
      return buildCase('self', caseId);
    })
  };

  window.CANVAS_MEDIA_LIBRARY = {
    featured: featuredOrder.map(function(item) {
      return buildCase(item[0], item[1]);
    }),
    collections: collections
  };
})();
