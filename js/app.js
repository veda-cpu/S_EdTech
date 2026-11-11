const navButtons = document.querySelectorAll('.nav-item[data-page]');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');
const crumbTitle = document.getElementById('crumbTitle');
const roleSelect = document.getElementById('roleSelect');
const roleHeading = document.getElementById('roleHeading');
const roleDescription = document.getElementById('roleDescription');
const roleChip = document.getElementById('roleChip');
const addLabel = document.getElementById('addLabel');
const toast = document.getElementById('toast');
let toastTimer;

const pageCopy = {
  overview: ['Good afternoon, Kanhiya ✦', 'Here’s what’s happening across your institute today.'],
  students: ['Student management', 'Manage admissions, student profiles and parent information.'],
  faculty: ['Faculty directory', 'Your teaching team, availability and faculty records in one place.'],
  academics: ['Academic operations', 'Manage classes, subjects, timetables and learning resources.'],
  attendance: ['Attendance center', 'Monitor daily attendance and review class-wise participation.'],
  finance: ['Finance & fee management', 'Track collections, outstanding balances and financial health.'],
  hrms: ['People & HRMS', 'Manage your people operations, payroll, leaves and attendance.'],
  reports: ['Reports & insights', 'Turn institute data into clear, actionable insights.'],
  settings: ['Workspace settings', 'Configure your institute preferences and access controls.']
};
const roleCopy = {
  Director: ['Director overview', 'A complete view of your institute’s performance and operations.', 'DIRECTOR VIEW', 'Add student'],
  Admin: ['Administration workspace', 'Manage admissions, student records, classes and daily operations.', 'ADMIN VIEW', 'Add student'],
  Accounts: ['Accounts workspace', 'Monitor fee collection, dues, invoices and financial activity.', 'ACCOUNTS VIEW', 'Record payment'],
  Faculty: ['Faculty workspace', 'Your classes, attendance, assignments and student progress.', 'FACULTY VIEW', 'Create assignment'],
  'HR Manager': ['People operations', 'Your workforce overview, leave approvals and payroll activities.', 'HR MANAGER VIEW', 'Add employee']
};
function showToast(message) {
  document.getElementById('toastText').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
const pageData = {
  students: {
    title: 'Student directory', desc: 'View, search and manage student records across all grades.',
    stats: [['Total students','2,486'],['New admissions','124'],['Pending approvals','18']],
    headers: ['STUDENT','CLASS','PARENT CONTACT','FEE STATUS','STATUS'],
    rows: [
      ['Aarav Sharma','Grade 8 - A','aarav.parent@email.com','Paid','Active'],
      ['Siya Reddy','Grade 6 - B','reddy.family@email.com','Paid','Active'],
      ['Vivaan Kapoor','Grade 10 - A','kapoor.home@email.com','Due','Pending'],
      ['Anaya Nair','Grade 5 - C','anaya.parent@email.com','Paid','Active'],
      ['Ishaan Gupta','Grade 7 - B','gupta.family@email.com','Partial','Active']
    ]
  },
  faculty: {
    title: 'Faculty directory', desc: 'Manage teaching staff, departments, schedules and availability.',
    stats: [['Total faculty','142'],['Present today','136'],['On leave','6']],
    headers: ['FACULTY MEMBER','DEPARTMENT','DESIGNATION','TODAY','STATUS'],
    rows: [
      ['Priya Sharma','Mathematics','Senior Teacher','09:00 AM','Active'],
      ['Rahul Verma','Science','HOD · Science','08:45 AM','Active'],
      ['Neha Kapoor','English','Assistant Teacher','On leave','On leave'],
      ['Amit Singh','Computer Science','Senior Teacher','08:52 AM','Active'],
      ['Meera Nair','Social Studies','Teacher','09:05 AM','Active']
    ]
  },
  academics: {
    title: 'Academic operations', desc: 'Coordinate classes, subjects, schedules and learning resources.',
    stats: [['Active classes','48'],['Subjects','32'],['Study resources','1,284']],
    headers: ['CLASS / SECTION','CLASS TEACHER','STUDENTS','SUBJECTS','SCHEDULE'],
    rows: [
      ['Grade 8 - A','Priya Sharma','42','8 subjects','View timetable'],
      ['Grade 8 - B','Rahul Verma','39','8 subjects','View timetable'],
      ['Grade 9 - A','Amit Singh','41','9 subjects','View timetable'],
      ['Grade 10 - A','Meera Nair','38','9 subjects','View timetable']
    ]
  },
  attendance: {
    title: 'Attendance center', desc: 'Monitor attendance trends and review class-wise participation.',
    stats: [["Today's attendance",'94.6%'],['Present students','2,352'],['Absent / leave','134']],
    headers: ['CLASS','TOTAL STUDENTS','PRESENT','ABSENT','ATTENDANCE'],
    rows: [
      ['Grade 8 - A','42','40','2','95.2%'],
      ['Grade 8 - B','39','37','2','94.9%'],
      ['Grade 9 - A','41','39','2','95.1%'],
      ['Grade 10 - A','38','35','3','92.1%'],
      ['Grade 6 - B','40','38','2','95.0%']
    ]
  },
  finance: {
    title: 'Fee & finance overview', desc: 'Track collections, outstanding balances, invoices and transactions.',
    stats: [['Collected this month','₹42.8L'],['Outstanding fees','₹8.4L'],['Transactions','1,248']],
    headers: ['TRANSACTION','STUDENT','DATE','AMOUNT','PAYMENT STATUS'],
    rows: [
      ['TXN-90841','Rohan Mehta','11 Nov, 2026','₹24,500','Paid'],
      ['TXN-90840','Aarav Sharma','11 Nov, 2026','₹18,000','Paid'],
      ['TXN-90839','Siya Reddy','10 Nov, 2026','₹12,500','Pending'],
      ['TXN-90838','Vivaan Kapoor','10 Nov, 2026','₹21,000','Overdue']
    ]
  },
  hrms: {
    title: 'People & HRMS', desc: 'A unified view of employees, payroll, leave requests and biometric attendance.',
    stats: [['Total employees','186'],['Payroll this month','₹28.6L'],['Leave requests','12']],
    headers: ['EMPLOYEE','DEPARTMENT','DESIGNATION','ATTENDANCE','STATUS'],
    rows: [
      ['Priya Singh','Faculty','Mathematics','Present','Active'],
      ['Rakesh Kumar','Administration','Office Manager','Present','Active'],
      ['Neha Kapoor','Faculty','English Teacher','On leave','On leave'],
      ['Ankit Jain','Accounts','Accountant','Present','Active'],
      ['Meera Nair','HR','HR Executive','Present','Active']
    ]
  },
  reports: {
    title: 'Reports & insights', desc: 'Explore institute performance and export decision-ready reports.',
    stats: [['Reports generated','328'],['Scheduled reports','8'],['Data freshness','Live']],
    headers: ['REPORT','CATEGORY','LAST UPDATED','OWNER','ACTION'],
    rows: [
      ['Monthly fee collection','Finance','Today, 10:30 AM','Accounts','Download'],
      ['Student attendance','Academics','Today, 09:45 AM','Admin','Download'],
      ['Admissions summary','Admissions','Yesterday','Admin','Download'],
      ['Payroll register','HRMS','01 Nov, 2026','HR Manager','Download']
    ]
  },
  settings: {
    title: 'Workspace settings', desc: 'Configure institute details, user access and platform preferences.',
    stats: [['User roles','5'],['Active users','214'],['Security','Protected']],
    headers: ['SETTING','DESCRIPTION','CURRENT VALUE','ACTION'],
    rows: [
      ['Institute profile','Name, address and branding','Northstar Academy','Manage'],
      ['Role permissions','Module-level access control','5 roles configured','Manage'],
      ['Academic session','Current academic year','2026 – 2027','Edit'],
      ['Notifications','Email and in-app alerts','Enabled','Configure']
    ]
  }
};

function renderWorkspace(page) {
  const data = pageData[page];
  let host = document.getElementById('pageWorkspace');
  if (!host) {
    host = document.createElement('div');
    host.id = 'pageWorkspace';
    document.querySelector('.role-banner').insertAdjacentElement('afterend', host);
  }
  if (!data) { host.innerHTML = ''; host.style.display = 'none'; return; }
  host.style.display = 'block';
  const stats = data.stats.map((s, i) => `<article class="workspace-stat"><span>${s[0]}</span><b>${s[1]}</b><small>${i === 0 ? 'Overview' : 'Updated just now'}</small></article>`).join('');
  const head = data.headers.map(h => `<th>${h}</th>`).join('');
  const rows = data.rows.map((row, ri) => `<tr>${row.map((cell, ci) => {
    const isStatus = ['Active','Pending','On leave','Paid','Due','Partial','Overdue'].includes(cell);
    return `<td>${isStatus ? `<span class="status ${cell === 'Active' || cell === 'Paid' ? 'active' : cell === 'Pending' || cell === 'Partial' ? 'pending' : 'muted-status'}">${cell}</span>` : cell}</td>`;
  }).join('')}</tr>`).join('');
  host.innerHTML = `
    <div class="workspace-heading"><div><div class="eyebrow">CAMPUSOS / ${page.toUpperCase()}</div><h2>${data.title}</h2><p>${data.desc}</p></div><button class="btn secondary" id="workspaceFilter">☷ Filters</button></div>
    <div class="workspace-stats">${stats}</div>
    <section class="panel workspace-table-panel">
      <div class="panel-head"><div><h3>${data.title} list</h3><p>${data.rows.length} sample records · Demo data</p></div><div class="table-tools"><input id="tableSearch" placeholder="Search records..." /><button class="btn primary" id="workspaceAdd">＋ Add new</button></div></div>
      <div class="table-scroll"><table><thead><tr>${head}</tr></thead><tbody id="workspaceRows">${rows}</tbody></table></div>
      <div class="table-foot"><span>Showing ${data.rows.length} of ${data.stats[0][1]} records</span><div><button disabled>‹</button><button class="current-page">1</button><button>2</button><button>3</button><button>›</button></div></div>
    </section>
    <div class="workspace-note"><span>✦</span><div><b>Everything is connected.</b><small>Changes made in this demo are illustrative. A unified backend can keep web, tablet and mobile experiences in sync.</small></div></div>`;
  document.getElementById('workspaceAdd').addEventListener('click', openModal);
  document.getElementById('workspaceFilter').addEventListener('click', () => showToast('Filters panel is ready for this demo view'));
  document.getElementById('tableSearch').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    [...document.querySelectorAll('#workspaceRows tr')].forEach(tr => tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none');
  });
  host.querySelectorAll('.table-foot button:not(:disabled)').forEach(btn => btn.addEventListener('click', () => showToast('Pagination preview · Demo data')));
}
function setPage(page) {
  const copy = pageCopy[page] || pageCopy.overview;
  navButtons.forEach(b => b.classList.toggle('active', b.dataset.page === page));
  crumbTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
  pageTitle.textContent = copy[0];
  pageSubtitle.textContent = copy[1];
  const overview = ['statsGrid', 'statsGrid'];
  const dashboard = document.querySelector('.dashboard-grid');
  const lower = document.querySelector('.lower-grid');
  const isOverview = page === 'overview';
  document.getElementById('statsGrid').style.display = isOverview ? 'grid' : 'none';
  dashboard.style.display = isOverview ? 'grid' : 'none';
  lower.style.display = isOverview ? 'grid' : 'none';
  renderWorkspace(page);
  document.querySelector('.sidebar').classList.remove('open');
  if (isOverview) showToast('Overview dashboard opened');
}
navButtons.forEach(btn => btn.addEventListener('click', () => setPage(btn.dataset.page)));
document.querySelectorAll('[data-page-link]').forEach(btn => btn.addEventListener('click', () => setPage(btn.dataset.pageLink)));

roleSelect.addEventListener('change', () => {
  const data = roleCopy[roleSelect.value];
  roleHeading.textContent = data[0];
  roleDescription.textContent = data[1];
  roleChip.textContent = data[2];
  addLabel.textContent = data[3];
  showToast(`${roleSelect.value} view activated`);
});

const backdrop = document.getElementById('modalBackdrop');
function openModal() {
  const role = roleSelect.value;
  document.getElementById('modalTitle').textContent = role === 'HR Manager' ? 'Add new employee' : role === 'Accounts' ? 'Record a payment' : 'Add new student';
  document.getElementById('modalDesc').textContent = 'Enter the details below to create a new record in your workspace.';
  backdrop.classList.add('open');
}
document.getElementById('addBtn').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', () => backdrop.classList.remove('open'));
backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.classList.remove('open'); });
document.getElementById('quickForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.querySelector('input').value.trim();
  if (!name) return;
  backdrop.classList.remove('open');
  e.target.reset();
  showToast(`${name} added successfully`);
});
document.getElementById('exportBtn').addEventListener('click', () => {
  const csv = 'Metric,Value\\nTotal Students,2486\\nFee Collection,42.8L\\nAttendance,94.6%\\nFaculty and Staff,186';
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'campusos-institute-report.csv'; a.click();
  URL.revokeObjectURL(url); showToast('Report exported as CSV');
});
document.getElementById('notificationBtn').addEventListener('click', () => showToast('You’re all caught up on notifications'));
document.getElementById('tourBtn').addEventListener('click', () => {
  showToast('Welcome to CampusOS! Start with the overview, then explore each module.');
});
document.getElementById('periodSelect').addEventListener('change', e => showToast(`Chart updated: ${e.target.value}`));
document.getElementById('globalSearch').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value.trim()) showToast(`Searching for “${e.target.value.trim()}”`);
});
document.getElementById('menuBtn').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('open'));
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); document.getElementById('globalSearch').focus(); }
  if (e.key === 'Escape') backdrop.classList.remove('open');
});

setPage('overview');

// --- Complete demo journeys: sample records, detail views and student/parent app tabs ---
let activePage = 'overview';
const flowDefinitions = {
  students: ['Admission pipeline','New enquiry','Application review','Documents verified','Admission confirmed'],
  faculty: ['Faculty lifecycle','Add faculty','Assign department','Set teaching schedule','Review attendance'],
  academics: ['Academic workflow','Create class','Assign class teacher','Build timetable','Publish study material'],
  attendance: ['Attendance workflow','Select class','Mark present / absent','Review exceptions','Publish attendance'],
  finance: ['Fee collection workflow','Configure fee plan','Generate invoice','Record payment','Download receipt'],
  hrms: ['HRMS workflow','Employee onboarding','Biometric attendance','Approve leave','Process payroll'],
  reports: ['Reporting workflow','Choose report','Set date range','Apply filters','Export report'],
  settings: ['Access configuration','Create user role','Assign permissions','Review access','Save configuration']
};
const sampleDetails = {
  students: ['Student ID: STU-2026-0841','Parent: Sunita Sharma','Phone: +91 98765 43210','Transport: Route 04','Fee plan: Annual · ₹84,000'],
  faculty: ['Employee ID: FAC-0142','Email: priya.sharma@northstar.edu','Experience: 8 years','Classes: Grade 8A, 9A','Attendance: 96.4%'],
  academics: ['Academic year: 2026–27','Class teacher assigned','Subjects mapped','Timetable published','Study materials available'],
  attendance: ['Present: 40','Absent: 2','Late arrivals: 1','Marked by: Priya Sharma','Last synced: 09:42 AM'],
  finance: ['Invoice: INV-2026-90841','Payment mode: UPI','Reference: UPI90841X','Receipt: RCPT-90841','Payment date: 11 Nov 2026'],
  hrms: ['Employee ID: EMP-0186','Department: Faculty','Leave balance: 12 days','Payroll status: Processed','Biometric ID: BIO-0186']
};
function openRecordDetail(page, cells) {
  let detail = document.getElementById('recordDetail');
  if (!detail) {
    detail = document.createElement('div');
    detail.id = 'recordDetail';
    detail.className = 'modal-backdrop';
    detail.innerHTML = `<div class="modal detail-modal"><button class="modal-close" id="detailClose">×</button><div class="modal-icon">▤</div><div class="eyebrow">RECORD DETAILS</div><h2 id="detailTitle"></h2><p id="detailSubtitle"></p><div id="detailFields" class="detail-fields"></div><div class="detail-actions"><button class="btn secondary" id="detailEdit">Edit record</button><button class="btn primary" id="detailAction">Confirm action →</button></div></div>`;
    document.body.appendChild(detail);
  }
  const data = pageData[page];
  detail.querySelector('#detailTitle').textContent = cells[0] || 'Record details';
  detail.querySelector('#detailSubtitle').textContent = `${data ? data.title : 'Workspace'} · Sample record`;
  const fields = (sampleDetails[page] || ['Sample record','Status: Active','Updated: Today']).map((v,i)=>`<div class="detail-field"><small>${v.split(':')[0]}</small><b>${v.includes(':') ? v.substring(v.indexOf(':')+1).trim() : v}</b></div>`).join('');
  detail.querySelector('#detailFields').innerHTML = fields + cells.slice(1).map((v,i)=>`<div class="detail-field"><small>${data.headers[i+1] || 'DETAIL'}</small><b>${v}</b></div>`).join('');
  detail.classList.add('open');
  detail.querySelector('#detailClose').onclick = () => detail.classList.remove('open');
  detail.onclick = e => { if(e.target === detail) detail.classList.remove('open'); };
  detail.querySelector('#detailEdit').onclick = () => { detail.classList.remove('open'); showToast('Edit mode opened · Demo interaction'); };
  detail.querySelector('#detailAction').onclick = () => { detail.classList.remove('open'); showToast('Action completed successfully'); };
}
function addFlowPanel(page) {
  const host = document.getElementById('pageWorkspace');
  if (!host || !flowDefinitions[page]) return;
  const [title,...steps] = flowDefinitions[page];
  const panel = document.createElement('section');
  panel.className = 'panel flow-panel';
  panel.innerHTML = `<div class="panel-head"><div><h3>${title}</h3><p>Explore the complete ${page} journey using sample institute data</p></div><span class="role-chip">DEMO FLOW</span></div><div class="flow-steps">${steps.map((s,i)=>`<button class="flow-step" data-step="${i}"><span>${String(i+1).padStart(2,'0')}</span><b>${s}</b><i>→</i></button>`).join('')}</div><div class="flow-feedback" id="flowFeedback">Select any step to preview the workflow.</div>`;
  host.appendChild(panel);
  panel.querySelectorAll('.flow-step').forEach(btn=>btn.addEventListener('click',()=>{
    panel.querySelectorAll('.flow-step').forEach(x=>x.classList.remove('chosen'));
    btn.classList.add('chosen');
    const idx=Number(btn.dataset.step);
    panel.querySelector('#flowFeedback').textContent = `${steps[idx]} · Demo step ${idx+1} of ${steps.length}. Sample data is loaded and ready to review.`;
    showToast(`${steps[idx]} opened`);
  }));
}
const originalRenderWorkspace = renderWorkspace;
renderWorkspace = function(page) {
  originalRenderWorkspace(page);
  if (pageData[page]) {
    const rows = document.querySelectorAll('#workspaceRows tr');
    rows.forEach(tr => {
      tr.style.cursor = 'pointer';
      tr.title = 'Click to view record details';
      tr.addEventListener('click', () => openRecordDetail(page, [...tr.children].map(td=>td.textContent.trim())));
    });
    addFlowPanel(page);
  }
  activePage = page;
};

// Keep newly created records in the visible sample table and in localStorage.
const oldSubmitHandler = document.getElementById('quickForm').onsubmit;
document.getElementById('quickForm').addEventListener('submit', e => {
  const page = activePage;
  if (!pageData[page]) return;
  const name = e.target.querySelector('input').value.trim();
  if (!name) return;
  const row = pageData[page].rows;
  const defaults = page === 'finance' ? [name,'New student','11 Nov, 2026','₹10,000','Paid'] :
    page === 'hrms' ? [name,'Administration','New employee','Present','Active'] :
    page === 'faculty' ? [name,'General','Teacher','09:00 AM','Active'] :
    [name,'Grade 8 - A','parent@example.com','Pending','Active'];
  row.unshift(defaults);
  try { localStorage.setItem('campusos_'+page, JSON.stringify(row)); } catch(err) {}
  setTimeout(()=>{ if(activePage===page) renderWorkspace(page); }, 50);
}, true);

// Student / Parent app is a working miniature prototype, not a static picture.
const mobileScreens = {
  Home: `<div class="mobile-head"><div><small>GOOD MORNING 👋</small><h2>Hi, Aarav!</h2><p>Grade 8 · Section A</p></div><div class="avatar purple">AS</div></div><div class="student-card"><div><small>OVERALL ATTENDANCE</small><strong>94.6%</strong><span>You're doing great! ↗</span></div><div class="mini-ring">94</div></div><div class="mobile-section-title"><b>Today's classes</b><a>See timetable</a></div><div class="class-card"><div class="class-time">09:00<br><small>AM</small></div><div class="class-color violet-bg"></div><div><b>Mathematics</b><small>Room 204 · Mrs. Sharma</small></div><span class="class-now">NOW</span></div><div class="class-card"><div class="class-time">10:00<br><small>AM</small></div><div class="class-color blue-bg"></div><div><b>Science</b><small>Lab 02 · Mr. Verma</small></div></div><div class="mobile-section-title"><b>Quick access</b><a>View all</a></div><div class="quick-grid"><div><i>◷</i><b>Attendance</b></div><div><i>▤</i><b>Results</b></div><div><i>₹</i><b>Fees</b></div><div><i>▣</i><b>Materials</b></div></div><div class="mobile-section-title"><b>Upcoming</b><a>Calendar</a></div><div class="upcoming"><div class="date-box"><b>18</b><small>NOV</small></div><div><b>Mathematics Unit Test</b><small>Wednesday · 10:00 AM</small></div><span>›</span></div>`,
  Attendance: `<div class="mobile-page-title"><small>STUDENT RECORD</small><h2>Attendance</h2><p>November 2026 · Grade 8A</p></div><div class="mobile-metric"><b>94.6%</b><small>Overall attendance</small></div><div class="mobile-list"><div><b>Mon, 09 Nov</b><span class="status active">Present</span></div><div><b>Tue, 10 Nov</b><span class="status active">Present</span></div><div><b>Wed, 11 Nov</b><span class="status active">Present</span></div><div><b>Thu, 12 Nov</b><span class="status pending">Upcoming</span></div><div><b>Fri, 13 Nov</b><span class="status pending">Upcoming</span></div></div>`,
  Academics: `<div class="mobile-page-title"><small>LEARNING HUB</small><h2>Academics</h2><p>Timetable, results & study resources</p></div><div class="mobile-list"><div><b>Mathematics · Unit Test</b><span>18 Nov · 10:00 AM</span></div><div><b>Science · Chapter 6 PDF</b><span>Study material · 2.4 MB</span></div><div><b>English · Essay writing</b><span>Homework due 14 Nov</span></div><div><b>Science Mid-term</b><span class="status active">82 / 100</span></div></div>`,
  Fees: `<div class="mobile-page-title"><small>ACCOUNT SUMMARY</small><h2>Fees & payments</h2><p>Academic year 2026–27</p></div><div class="mobile-metric"><b>₹18,000</b><small>Outstanding balance</small></div><div class="mobile-list"><div><b>Annual tuition fee</b><span>₹60,000</span></div><div><b>Transport fee</b><span>₹18,000</span></div><div><b>Paid till date</b><span class="status active">₹60,000</span></div></div><button class="mobile-pay" id="mobilePay">Pay ₹18,000 now →</button>`,
  Profile: `<div class="mobile-page-title"><small>ACCOUNT</small><h2>Aarav Sharma</h2><p>STU-2026-0841 · Grade 8A</p></div><div class="mobile-list"><div><b>Parent / Guardian</b><span>Sunita Sharma</span></div><div><b>Class teacher</b><span>Priya Sharma</span></div><div><b>Institute</b><span>Northstar Academy</span></div><div><b>Notifications</b><span>Enabled</span></div></div>`
};
const phoneApp = document.querySelector('.phone-app');
if (phoneApp) {
  const nav = phoneApp.querySelector('.bottom-nav');
  const tabs = ['Home','Attendance','Academics','Fees','Profile'];
  function setMobileTab(tab) {
    const body = phoneApp.querySelector('.mobile-body');
    if (body) body.innerHTML = mobileScreens[tab];
    phoneApp.querySelectorAll('.bottom-nav span').forEach((el,i)=>el.classList.toggle('selected',tabs[i]===tab));
    if(tab==='Fees') {
      const pay=phoneApp.querySelector('#mobilePay');
      if(pay) pay.addEventListener('click',()=>showToast('Demo payment successful · Receipt RCPT-2026-118'));
    }
  }
  if (nav) {
    const body = document.createElement('div'); body.className='mobile-body';
    const oldContent = [...phoneApp.children].filter(el=>el!==nav && !el.classList.contains('phone-status'));
    // Keep original home content as the initial view; mobile tab clicks replace it.
    const first = oldContent.find(el=>el.classList.contains('mobile-head'));
    if(first) {
      const siblings=[...phoneApp.children];
      const status=siblings.find(el=>el.classList.contains('phone-status'));
      const appNav=nav;
      const contentWrap=document.createElement('div'); contentWrap.className='mobile-body';
      siblings.filter(el=>el!==status && el!==appNav).forEach(el=>contentWrap.appendChild(el));
      phoneApp.insertBefore(contentWrap,appNav);
    }
    nav.querySelectorAll('span').forEach((el,i)=>{el.style.pointerEvents='auto';el.style.cursor='pointer';el.addEventListener('click',()=>setMobileTab(tabs[i]));});
  }
}

// Full-screen Student & Parent mobile app walkthrough
(function(){
 const webTab=document.getElementById('webTab'), mobileTab=document.getElementById('mobileTab');
 const webContent=document.querySelector('.content'), mobileView=document.getElementById('mobileAppView');
 const floatingPreview=document.querySelector('.mobile-preview');
 function switchPlatform(which){
   const isMobile=which==='mobile';
   webTab.classList.toggle('active',!isMobile); mobileTab.classList.toggle('active',isMobile);
   webTab.setAttribute('aria-selected',String(!isMobile)); mobileTab.setAttribute('aria-selected',String(isMobile));
   webContent.style.display=isMobile?'none':'block'; mobileView.classList.toggle('visible',isMobile);
   if(floatingPreview) floatingPreview.style.display='none';
   document.getElementById('crumbTitle').textContent=isMobile?'Student & Parent App':(activePage==='overview'?'Overview':activePage[0].toUpperCase()+activePage.slice(1));
 }
 webTab.addEventListener('click',()=>switchPlatform('web'));
 mobileTab.addEventListener('click',()=>switchPlatform('mobile'));
 const content=document.getElementById('appScreenContent');
 let persona='student', appPage='Home';
 const pages={
  Home:()=>`<div class="app-attendance-card"><small>OVERALL ATTENDANCE</small><strong>94.6%</strong><span>You're doing great this month ↗</span><div class="app-progress"><i></i></div></div>
   <div class="app-section-head"><b>Today's classes</b><button data-app-go="Timetable">Full timetable →</button></div>
   <div class="app-class"><time>09:00<small>AM</small></time><i class="class-bar violet-bar"></i><div><b>Mathematics</b><small>Room 204 · Mrs. Sharma</small></div><em>NOW</em></div>
   <div class="app-class"><time>10:00<small>AM</small></time><i class="class-bar blue-bar"></i><div><b>Science</b><small>Lab 02 · Mr. Verma</small></div></div>
   <div class="app-section-head"><b>Quick access</b><span>Explore services</span></div>
   <div class="app-quick-grid"><button data-app-go="Attendance"><i>◷</i>Attendance</button><button data-app-go="Results"><i>▤</i>Results</button><button data-app-go="Fees"><i>₹</i>Fees</button><button data-app-go="Materials"><i>▧</i>Materials</button></div>
   <div class="app-section-head"><b>Upcoming examination</b><button data-app-go="Results">Details →</button></div><div class="app-event"><div><b>18</b><small>NOV</small></div><section><b>Mathematics Unit Test</b><small>Wednesday · 10:00 AM</small></section><span>›</span></div>
   <div class="app-section-head"><b>Latest announcement</b><button data-app-go="Messages">View all →</button></div><div class="app-announcement"><b>Annual Sports Day</b><p>Registration is open until 20 November. Contact your class teacher.</p></div>`,
  Attendance:()=>`<div class="app-page-intro"><small>STUDENT RECORD</small><h2>Attendance</h2><p>November 2026 · Grade 8A</p></div><div class="app-highlight"><strong>94.6%</strong><span>Overall attendance</span><div class="app-progress"><i></i></div></div><div class="app-section-head"><b>Attendance history</b><span>November</span></div><div class="app-record-list">${[['11 Nov, Wed','Present','active'],['10 Nov, Tue','Present','active'],['09 Nov, Mon','Present','active'],['06 Nov, Fri','Absent','pending'],['05 Nov, Thu','Present','active'],['04 Nov, Wed','Present','active']].map(x=>`<div><b>${x[0]}</b><span class="app-pill ${x[2]}">${x[1]}</span></div>`).join('')}</div><button class="app-primary-btn" data-app-action="attendanceReport">View monthly report →</button>`,
  Academics:()=>`<div class="app-page-intro"><small>LEARNING HUB</small><h2>Academics</h2><p>Your learning, all in one place.</p></div><div class="app-feature-list"><button data-app-go="Timetable"><i>▦</i><span><b>Class timetable</b><small>Today's and weekly schedule</small></span><em>→</em></button><button data-app-go="Results"><i>▤</i><span><b>Exam results</b><small>Marks, grades and report cards</small></span><em>→</em></button><button data-app-go="Materials"><i>▧</i><span><b>Study materials</b><small>PDFs, notes and assignments</small></span><em>→</em></button><button data-app-go="Homework"><i>✎</i><span><b>Homework</b><small>3 assignments to complete</small></span><em>→</em></button></div><div class="app-announcement"><b>Learning progress</b><p>You've completed 8 of 10 assignments this month. Keep it up!</p></div>`,
  Fees:()=>`<div class="app-page-intro"><small>ACCOUNT SUMMARY</small><h2>Fees & payments</h2><p>Academic year 2026–27</p></div><div class="app-highlight fee-highlight"><span>Outstanding balance</span><strong>₹18,000</strong><small>Due date: 20 November 2026</small></div><div class="app-section-head"><b>Fee breakdown</b><span>2026–27</span></div><div class="app-record-list"><div><b>Annual tuition fee</b><span>₹60,000</span></div><div><b>Transport fee</b><span>₹18,000</span></div><div><b>Paid till date</b><span class="green-text">₹60,000</span></div><div><b>Outstanding</b><span class="orange-text">₹18,000</span></div></div><button class="app-primary-btn" data-app-action="pay">Pay ₹18,000 now →</button><div class="app-section-head"><b>Recent payments</b><button data-app-go="Payments">View history →</button></div><div class="app-record-list"><div><b>05 Oct · UPI</b><span>₹20,000 · Paid</span></div><div><b>05 Sep · Net banking</b><span>₹20,000 · Paid</span></div></div>`,
  Profile:()=>`<div class="app-profile-hero"><div class="app-avatar large">${persona==='student'?'AS':'SS'}</div><h2>${persona==='student'?'Aarav Sharma':'Sunita Sharma'}</h2><p>${persona==='student'?'STU-2026-0841 · Grade 8A':'Parent account · PRT-2026-0218'}</p></div><div class="app-feature-list"><button><i>♙</i><span><b>Personal information</b><small>Profile and contact details</small></span><em>→</em></button><button><i>♧</i><span><b>${persona==='student'?'Parent / Guardian':'Linked children'}</b><small>${persona==='student'?'Sunita Sharma · +91 98765 43210':'Aarav Sharma · Grade 8A'}</small></span><em>→</em></button><button data-app-go="Messages"><i>♧</i><span><b>Notifications</b><small>Announcements and reminders</small></span><em>→</em></button><button><i>⚙</i><span><b>App settings</b><small>Language, privacy and help</small></span><em>→</em></button></div>`,
  Timetable:()=>`<div class="app-page-intro"><small>WEEKLY SCHEDULE</small><h2>Class timetable</h2><p>Wednesday, 11 November 2026</p></div><div class="app-day-strip"><b>MON</b><b>TUE</b><b class="chosen">WED</b><b>THU</b><b>FRI</b></div><div class="app-record-list timetable-list">${[['09:00 AM','Mathematics','Mrs. Priya Sharma','Room 204'],['10:00 AM','Science','Mr. Rahul Verma','Lab 02'],['11:30 AM','English','Ms. Neha Kapoor','Room 105'],['01:00 PM','Computer Science','Mr. Amit Singh','Computer Lab'],['02:00 PM','Social Studies','Ms. Meera Nair','Room 201']].map(x=>`<div class="timetable-row"><time>${x[0]}</time><section><b>${x[1]}</b><small>${x[2]} · ${x[3]}</small></section></div>`).join('')}</div>`,
  Results:()=>`<div class="app-page-intro"><small>ACADEMIC PERFORMANCE</small><h2>Exam results</h2><p>Mid-term assessment · October 2026</p></div><div class="app-highlight"><strong>86.4%</strong><span>Overall percentage · Grade A</span></div><div class="app-record-list">${[['Mathematics','92 / 100','A+'],['Science','88 / 100','A'],['English','84 / 100','A'],['Social Studies','82 / 100','A'],['Computer Science','86 / 100','A']].map(x=>`<div><b>${x[0]}</b><span>${x[1]} · ${x[2]}</span></div>`).join('')}</div><button class="app-primary-btn" data-app-action="reportCard">Download report card ↓</button>`,
  Materials:()=>`<div class="app-page-intro"><small>STUDY LIBRARY</small><h2>Study materials</h2><p>Notes and resources shared by your teachers.</p></div><div class="app-feature-list">${[['PDF','Mathematics · Algebra notes','2.4 MB · 10 Nov'],['DOC','Science · Chapter 6 worksheet','840 KB · 09 Nov'],['PDF','English · Grammar guide','1.2 MB · 08 Nov'],['PDF','Social Studies · Map work','3.1 MB · 07 Nov']].map(x=>`<button data-app-action="download"><i>${x[0]}</i><span><b>${x[1]}</b><small>${x[2]}</small></span><em>↓</em></button>`).join('')}</div>`,
  Homework:()=>`<div class="app-page-intro"><small>ASSIGNMENTS</small><h2>Homework</h2><p>Track tasks and submission status.</p></div><div class="app-record-list">${[['Mathematics','Algebra exercises · Due 14 Nov','Pending'],['Science','Chapter 6 questions · Due 15 Nov','Pending'],['English','Essay writing · Due 12 Nov','Submitted'],['Social Studies','Map activity · Due 16 Nov','Pending']].map(x=>`<div class="homework-row"><section><b>${x[0]}</b><small>${x[1]}</small></section><span>${x[2]}</span></div>`).join('')}</div><button class="app-primary-btn" data-app-action="homework">Submit assignment →</button>`,
  Messages:()=>`<div class="app-page-intro"><small>COMMUNICATION</small><h2>Messages</h2><p>Stay connected with your institute.</p></div><div class="app-feature-list">${[['PS','Priya Sharma · Class Teacher','Tomorrow’s class test will begin at 10 AM.'],['NA','Northstar Academy','Annual Sports Day registration is now open.'],['AC','Accounts Office','Fee reminder: ₹18,000 due by 20 November.']].map(x=>`<button data-app-action="message"><i>${x[0]}</i><span><b>${x[1]}</b><small>${x[2]}</small></span><em>›</em></button>`).join('')}</div>`,
  Payments:()=>`<div class="app-page-intro"><small>TRANSACTION HISTORY</small><h2>Payment history</h2><p>Receipts and past fee transactions.</p></div><div class="app-record-list">${[['05 Oct 2026','Tuition fee · UPI','₹20,000'],['05 Sep 2026','Tuition fee · Net banking','₹20,000'],['05 Aug 2026','Admission fee · UPI','₹20,000']].map(x=>`<div><section><b>${x[0]}</b><small>${x[1]}</small></section><span class="green-text">${x[2]}</span></div>`).join('')}</div>`
 };
 function renderApp(page){
  appPage=page; content.innerHTML=(pages[page]||pages.Home)();
  document.querySelectorAll('#appBottomNav button').forEach(b=>b.classList.toggle('active',b.dataset.appPage===page || (['Timetable','Results','Materials','Homework'].includes(page)&&b.dataset.appPage==='Academics') || (page==='Payments'&&b.dataset.appPage==='Fees') || (page==='Messages'&&b.dataset.appPage==='Profile')));
  content.querySelectorAll('[data-app-go]').forEach(b=>b.addEventListener('click',()=>renderApp(b.dataset.appGo)));
  content.querySelectorAll('[data-app-action]').forEach(b=>b.addEventListener('click',()=>{
   const action=b.dataset.appAction;
   if(action==='pay'){if(confirm('Demo payment: Pay ₹18,000 using simulated UPI?')){b.textContent='✓ Payment successful · Receipt RCPT-2026-118';b.disabled=true;}}
   else if(action==='reportCard'||action==='download'){b.textContent='✓ Ready · Demo file generated';}
   else if(action==='attendanceReport'){b.textContent='Monthly report generated';}
   else if(action==='homework'){b.textContent='✓ Assignment submitted';}
   else if(action==='message'){showToast('Message thread opened · Demo conversation');}
  }));
 }
 document.querySelectorAll('#appBottomNav button').forEach(b=>b.addEventListener('click',()=>renderApp(b.dataset.appPage)));
 document.querySelectorAll('[data-app-shortcut]').forEach(b=>b.addEventListener('click',()=>{switchPlatform('mobile');renderApp(b.dataset.appShortcut);}));
 document.querySelectorAll('.persona-btn').forEach(b=>b.addEventListener('click',()=>{
  persona=b.dataset.persona;
  document.querySelectorAll('.persona-btn').forEach(x=>x.classList.toggle('active',x===b));
  document.getElementById('appUserName').textContent=persona==='student'?'Hi, Aarav!':'Welcome, Sunita!';
  document.getElementById('appUserMeta').textContent=persona==='student'?'Grade 8 · Section A':'Parent account · 1 child linked';
  document.getElementById('appAvatar').textContent=persona==='student'?'AS':'SS';
  renderApp('Home');
 }));
 renderApp('Home');
})();
