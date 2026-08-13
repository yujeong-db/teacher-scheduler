"use strict";
const { useState, useMemo, useEffect, useRef, useCallback, createContext, useContext, Fragment, StrictMode } = React;

// ---------- Minimal dependency-free icons ----------
function Icon({ path, className, strokeWidth = 2 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className || "h-4 w-4"}>
      {path}
    </svg>
  );
}
const ChevronDownIcon = (p) => <Icon {...p} path={<polyline points="6 9 12 15 18 9" />} />;
const ChevronRightIcon = (p) => <Icon {...p} path={<polyline points="9 18 15 12 9 6" />} />;
const SearchIcon = (p) => <Icon {...p} path={<><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>} />;
const PlusIcon = (p) => <Icon {...p} path={<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>} />;
const TrashIcon = (p) => <Icon {...p} path={<><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></>} />;
const AlertIcon = (p) => <Icon {...p} path={<><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>} />;
const LayersIcon = (p) => <Icon {...p} path={<><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>} />;
const UsersIcon = (p) => <Icon {...p} path={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>} />;
const CircleDashedIcon = (p) => <Icon {...p} path={<circle cx="12" cy="12" r="9" strokeDasharray="3 3" />} />;
const TrendUpIcon = (p) => <Icon {...p} path={<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>} />;
const CheckCircleIcon = (p) => <Icon {...p} path={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>} />;
const ShieldIcon = (p) => <Icon {...p} path={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>} />;
const UserIcon = (p) => <Icon {...p} path={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>} />;
const XIcon = (p) => <Icon {...p} path={<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>} />;
const UploadIcon = (p) => <Icon {...p} path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>} />;
const DownloadIcon = (p) => <Icon {...p} path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>} />;
const StarIcon = (p) => <Icon {...p} path={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />} />;
const KeyIcon = (p) => <Icon {...p} path={<><circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" /></>} />;
const GearIcon2 = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>} />;
const ArrowLeftIcon = (p) => <Icon {...p} path={<><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>} />;
const SwapIcon = (p) => <Icon {...p} path={<><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></>} />;
const LightbulbIcon = (p) => <Icon {...p} path={<><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></>} />;
const CloudIcon = (p) => <Icon {...p} path={<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.5-1.5A5 5 0 0 0 6.5 19h11z" />} />;
const CloudOffIcon = (p) => <Icon {...p} path={<><path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6" /><path d="M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3" /><line x1="1" y1="1" x2="23" y2="23" /></>} />;
const UserPlusIcon = (p) => <Icon {...p} path={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></>} />;

// ---------- constants (from types.ts) ----------
const MEMBER_STATUSES = ['시도 전', '진행중', '완료', '이관회원'];
const LEVELS = ['알파벳', '파닉스', '1', '2', '3', '4', '5', '80', '100', '문법'];
const PRODUCTS = ['단과', '전과목', '자주표A', '자주표B'];
const WEEKDAYS = ['월', '화', '수', '목', '금'];

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

// ---------- date utils ----------
function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function parseISODate(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function mondayOf(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return toISODate(date);
}
function addDays(iso, days) {
  const d = parseISODate(iso);
  d.setDate(d.getDate() + days);
  return toISODate(d);
}
function addWeeks(iso, weeks) {
  return addDays(iso, weeks * 7);
}
const WEEKDAY_OFFSET = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
function dateOfWeekday(mondayIso, weekday) {
  return addDays(mondayIso, WEEKDAY_OFFSET[weekday] ?? 0);
}
const AB_REFERENCE_MONDAY = '2026-01-05';
function weekLabel(mondayIso) {
  const ref = parseISODate(AB_REFERENCE_MONDAY).getTime();
  const cur = parseISODate(mondayIso).getTime();
  const weeksBetween = Math.round((cur - ref) / (7 * 24 * 60 * 60 * 1000));
  return weeksBetween % 2 === 0 ? 'A' : 'B';
}
function formatMonthDay(iso) {
  const d = parseISODate(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
function isDateInRange(iso, startIso, endIso) {
  return iso >= startIso && iso <= endIso;
}
function generateTimeSlots(startHour = 15, endHour = 21) {
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}

// ---------- schedule engine ----------
const TIME_SLOTS = generateTimeSlots(15, 21);
const FIXED_CAPACITY = 8;
const GUEST_CAPACITY = 2;

function studentAppliesToWeek(student, weekMonday) {
  if (weekMonday < student.startWeek) return false;
  if (student.product === '단과' || student.product === '전과목') return true;
  const label = weekLabel(weekMonday);
  if (student.product === '자주표A') return label === 'A';
  if (student.product === '자주표B') return label === 'B';
  return false;
}
function studentOnLeave(student, classDateIso) {
  return student.holidayPeriods.some((hp) => isDateInRange(classDateIso, hp.startDate, hp.endDate));
}
function occupantColor(student, onLeave) {
  if (onLeave) return 'gray';
  if (student.product === '자주표A' || student.product === '자주표B') return 'blue';
  return 'black';
}
function toOccupant(student, classDateIso) {
  const onLeave = studentOnLeave(student, classDateIso);
  return {
    studentId: student.id,
    name: student.name,
    level: student.level,
    product: student.product,
    color: occupantColor(student, onLeave),
    onLeave,
    availableNote: student.availableNote,
    memo: student.memo,
  };
}
function hypotheticalCount(students, weekday, time, weekMonday, label) {
  return students.filter((s) => {
    if (s.weekday !== weekday || s.time !== time) return false;
    if (weekMonday < s.startWeek) return false;
    if (s.product === '단과' || s.product === '전과목') return true;
    if (s.product === '자주표A') return label === 'A';
    if (s.product === '자주표B') return label === 'B';
    return false;
  }).length;
}
function buildSchedule({ students, guests = [], weekMondays }) {
  return weekMondays.map((weekMonday) => {
    const label = weekLabel(weekMonday);
    const slots = {};
    for (const weekday of WEEKDAYS) {
      slots[weekday] = {};
      for (const time of TIME_SLOTS) {
        const classDateIso = dateOfWeekday(weekMonday, weekday);
        const occupantStudents = students.filter(
          (s) => s.weekday === weekday && s.time === time && studentAppliesToWeek(s, weekMonday)
        );
        const occupants = occupantStudents.map((s) => toOccupant(s, classDateIso));
        const currentCount = occupants.filter((o) => !o.onLeave).length;
        const otherLabel = label === 'A' ? 'B' : 'A';
        const otherCount = hypotheticalCount(students, weekday, time, weekMonday, otherLabel);

        let capacityBadge = null;
        if (currentCount >= FIXED_CAPACITY) capacityBadge = 'FULL';
        else if (otherCount >= FIXED_CAPACITY) capacityBadge = 'WARN';

        const distinctLevels = new Set(occupants.filter((o) => !o.onLeave).map((o) => o.level));
        const levelMixWarning = distinctLevels.size >= 3;

        const guestCount = guests.filter(
          (g) => g.weekday === weekday && g.time === time && g.weekMonday === weekMonday
        ).length;

        slots[weekday][time] = { weekday, time, weekMonday, occupants, guestCount, capacityBadge, levelMixWarning };
      }
    }
    return { weekMonday, weekLabel: label, slots };
  });
}
function findDuplicateMemberNos(students) {
  const counts = new Map();
  for (const s of students) {
    if (!s.memberNo) continue;
    counts.set(s.memberNo, (counts.get(s.memberNo) ?? 0) + 1);
  }
  const dupes = new Set();
  for (const [no, count] of counts) if (count > 1) dupes.add(no);
  return dupes;
}

// ---------- per-level color coding (calendar readability) ----------
const LEVEL_COLORS = {
  '알파벳': '#db2777', // pink-600
  '파닉스': '#ea580c', // orange-600
  '1': '#2563eb', // blue-600
  '2': '#16a34a', // green-600
  '3': '#7c3aed', // violet-600
  '4': '#0d9488', // teal-600
  '5': '#4f46e5', // indigo-600
  '80': '#b45309', // amber-700
  '100': '#be123c', // rose-700
  '문법': '#475569', // slate-600
};
function levelColor(level) {
  return LEVEL_COLORS[level] || '#4f46e5';
}

// Returns the capacity badge ('FULL' | 'WARN' | null) for a given weekday/time,
// checked across BOTH displayed weeks (used to warn immediately in the member list
// the moment a teacher assigns a slot that is already full or about to overflow).
function capacityBadgeForSlot(students, weekday, time, weekMondays) {
  let worst = null;
  for (const weekMonday of weekMondays) {
    const label = weekLabel(weekMonday);
    const classDateIso = dateOfWeekday(weekMonday, weekday);
    const currentCount = students.filter((s) => {
      if (s.weekday !== weekday || s.time !== time) return false;
      if (!studentAppliesToWeek(s, weekMonday)) return false;
      return !studentOnLeave(s, classDateIso);
    }).length;
    const otherLabel = label === 'A' ? 'B' : 'A';
    const otherCount = hypotheticalCount(students, weekday, time, weekMonday, otherLabel);
    if (currentCount >= FIXED_CAPACITY) return 'FULL';
    if (otherCount >= FIXED_CAPACITY) worst = 'WARN';
  }
  return worst;
}

// ---------- best-effort Korean availability text -> suggested slots ----------
// Parses free text like "월,수 저녁 가능", "화 6시 이후 가능", "주말만 가능" into
// weekday + time-of-day hints, then cross-references the teacher's current schedule
// to suggest open slots. This is a heuristic, not a full NLP parser.
const WEEKDAY_CHAR_MAP = { 월: '월', 화: '화', 수: '수', 목: '목', 금: '금' };
const TIME_OF_DAY_RANGES = {
  아침: [7, 10],
  오전: [7, 12],
  점심: [12, 14],
  오후: [12, 17],
  저녁: [17, 21],
  밤: [19, 21],
};

function parseAvailability(note) {
  if (!note || !note.trim()) return null;
  const text = note.trim();
  const weekdays = new Set();
  for (const ch of Object.keys(WEEKDAY_CHAR_MAP)) {
    if (text.includes(ch)) weekdays.add(ch);
  }
  let minHour = null;
  let maxHour = null;
  for (const [word, range] of Object.entries(TIME_OF_DAY_RANGES)) {
    if (text.includes(word)) {
      minHour = minHour === null ? range[0] : Math.min(minHour, range[0]);
      maxHour = maxHour === null ? range[1] : Math.max(maxHour, range[1]);
    }
  }
  // "N시 이후" style (e.g. "6시 이후", "18시 이후")
  const afterMatch = text.match(/(\d{1,2})\s*시\s*이후/);
  if (afterMatch) {
    let h = parseInt(afterMatch[1], 10);
    if (h < 9) h += 12; // assume PM for small numbers like "6시 이후"
    minHour = minHour === null ? h : Math.max(minHour, h);
  }
  // "N시 이전" / "N시까지"
  const beforeMatch = text.match(/(\d{1,2})\s*시\s*(이전|까지)/);
  if (beforeMatch) {
    let h = parseInt(beforeMatch[1], 10);
    if (h < 9) h += 12;
    maxHour = maxHour === null ? h : Math.min(maxHour, h);
  }
  if (weekdays.size === 0 && minHour === null && maxHour === null) return null;
  return {
    weekdays: weekdays.size > 0 ? weekdays : new Set(WEEKDAYS),
    minHour: minHour ?? 15,
    maxHour: maxHour ?? 21,
  };
}

function suggestSlotsForNote(note, students, weekMondays, excludeStudentId) {
  const availability = parseAvailability(note);
  if (!availability) return [];
  const others = excludeStudentId ? students.filter((s) => s.id !== excludeStudentId) : students;
  const suggestions = [];
  for (const weekday of WEEKDAYS) {
    if (!availability.weekdays.has(weekday)) continue;
    for (const time of TIME_SLOTS) {
      const hour = parseInt(time.split(':')[0], 10);
      if (hour < availability.minHour || hour >= availability.maxHour) continue;
      const badge = capacityBadgeForSlot(others, weekday, time, weekMondays);
      if (badge === 'FULL') continue;
      suggestions.push({ weekday, time, badge });
    }
  }
  // prefer slots with no warning at all, then earliest time
  suggestions.sort((a, b) => {
    if ((a.badge === 'WARN') !== (b.badge === 'WARN')) return a.badge === 'WARN' ? 1 : -1;
    if (a.weekday !== b.weekday) return WEEKDAYS.indexOf(a.weekday) - WEEKDAYS.indexOf(b.weekday);
    return a.time.localeCompare(b.time);
  });
  return suggestions.slice(0, 5);
}

// ---------- xlsx import / export (SheetJS, loaded via CDN as global XLSX) ----------
const HEADER_ALIASES = {
  memberNo: ['회원번호', 'CAS번호', '학생 회원번호', '번호'],
  name: ['회원명', '이름', '학생 회원명', '성명'],
  grade: ['학년'],
  level: ['레벨'],
  product: ['상품', '구독상품', '상품명'],
  weekday: ['요일'],
  time: ['시간'],
};

function findHeaderRow(rows) {
  for (let i = 0; i < Math.min(rows.length, 15); i++) {
    const row = rows[i].map((c) => (c == null ? '' : String(c).trim()));
    let hits = 0;
    for (const aliases of Object.values(HEADER_ALIASES)) {
      if (row.some((cell) => aliases.includes(cell))) hits++;
    }
    if (hits >= 3) return i; // treat as header row once we recognize at least 3 known columns
  }
  return -1;
}

function buildColumnMap(headerRow) {
  const map = {};
  headerRow.forEach((cell, idx) => {
    const value = cell == null ? '' : String(cell).trim();
    for (const [field, aliases] of Object.entries(HEADER_ALIASES)) {
      if (aliases.includes(value) && map[field] === undefined) map[field] = idx;
    }
  });
  return map;
}

// Reads a File (xlsx/xls/csv) and returns { rows, matchedFields } where rows are
// plain objects with whatever of memberNo/name/grade/level/product/weekday/time
// could be recognized from the header row.
function parseStudentFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' });
        const headerIdx = findHeaderRow(raw);
        if (headerIdx === -1) {
          resolve({ rows: [], matchedFields: [] });
          return;
        }
        const colMap = buildColumnMap(raw[headerIdx]);
        const rows = [];
        for (let i = headerIdx + 1; i < raw.length; i++) {
          const r = raw[i];
          if (!r || r.every((c) => c === '' || c == null)) continue;
          const get = (field) => (colMap[field] !== undefined ? String(r[colMap[field]] ?? '').trim() : '');
          const name = get('name');
          const memberNo = get('memberNo');
          if (!name && !memberNo) continue;
          const levelRaw = get('level');
          const level = LEVELS.includes(levelRaw) ? levelRaw : LEVELS.includes(String(levelRaw).replace(/[^0-9a-zA-Z가-힣]/g, '')) ? levelRaw : '1';
          const productRaw = get('product');
          const product = PRODUCTS.includes(productRaw) ? productRaw : '전과목';
          const weekdayRaw = get('weekday');
          const weekday = WEEKDAYS.includes(weekdayRaw) ? weekdayRaw : '월';
          const timeRaw = get('time');
          const time = /^\d{1,2}:\d{2}$/.test(timeRaw) ? (timeRaw.length === 4 ? '0' + timeRaw : timeRaw) : '15:00';
          rows.push({ memberNo, name, grade: get('grade'), level, product, weekday, time });
        }
        resolve({ rows, matchedFields: Object.keys(colMap) });
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

function summarizeHolidaysForExport(student) {
  if (student.holidayPeriods.length === 0) return '';
  return student.holidayPeriods.map((hp) => `${formatMonthDay(hp.startDate)}~${formatMonthDay(hp.endDate)}`).join(', ');
}

function exportStudentsToXlsx(students, teacherName) {
  const rows = students.map((s) => ({
    상태: s.status,
    회원번호: s.memberNo,
    회원명: s.name,
    학년: s.grade,
    레벨: s.level,
    상품: s.product,
    수업시작주차: s.startWeek,
    요일: s.weekday,
    시간: s.time,
    비고: s.availableNote,
    메모: s.memo,
    '결석(타 클래스 참여) 기간': summarizeHolidaysForExport(s),
  }));
  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 8 }, { wch: 10 }, { wch: 10 }, { wch: 6 }, { wch: 8 }, { wch: 8 },
    { wch: 12 }, { wch: 6 }, { wch: 8 }, { wch: 20 }, { wch: 24 }, { wch: 24 },
  ];
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '회원목록');
  const today = new Date();
  const dateStamp = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  const safeName = teacherName.replace(/[\\/:*?"<>|]/g, '');
  XLSX.writeFile(workbook, `${safeName}_회원목록_${dateStamp}.xlsx`);
}

// ---------- mock data ----------
const TEAMS = [
  { id: 'team-cne1', name: 'CNE1' },
  { id: 'team-cn1', name: 'CN1' },
  { id: 'team-cne2', name: 'CNE2' },
  { id: 'team-new', name: '신규팀' },
];
const TEACHERS = [
  { id: 'teacher-1', teamId: 'team-cne1', name: '강선아' },
  { id: 'teacher-2', teamId: 'team-cne1', name: '김나리' },
  { id: 'teacher-3', teamId: 'team-cne1', name: '이민정' },
  { id: 'teacher-4', teamId: 'team-cne1', name: '황율추' },
  { id: 'teacher-5', teamId: 'team-cne1', name: '신민경' },
  { id: 'teacher-6', teamId: 'team-cn1', name: '한아름' },
  { id: 'teacher-7', teamId: 'team-cn1', name: '양혜경' },
  { id: 'teacher-8', teamId: 'team-cn1', name: '정회란' },
  { id: 'teacher-9', teamId: 'team-cne2', name: '강지영' },
  { id: 'teacher-10', teamId: 'team-cne2', name: '김희정' },
  { id: 'teacher-11', teamId: 'team-new', name: '문희정' },
];

const SURNAMES = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권'];
const GIVEN = [
  '은혜', '아윤', '하윤', '준혁', '이안', '은찬', '범준', '다현', '진호', '우진', '지안', '서진', '시아', '서하', '나은',
  '아라', '기태', '소은', '서준', '규빈', '하엘', '하온', '라온', '동률', '지원', '별하', '서우', '해솔', '민준', '유준',
  '서아', '지호', '예준', '수아', '도윤', '하린', '건우', '지우', '연우', '주원',
];
function pick(arr, seed) {
  return arr[((seed % arr.length) + arr.length) % arr.length];
}
function randomName(seed) {
  return pick(SURNAMES, seed) + pick(GIVEN, seed * 7 + 3);
}
const GRADES = ['7세', '1', '2', '3', '4', '5', '6', '중1', '중2'];
const MOCK_PRODUCTS = ['단과', '전과목', '전과목', '전과목', '자주표A', '자주표B'];
const MOCK_STATUSES = ['시도 전', '진행중', '완료'];
const MOCK_TIME_SLOTS = generateTimeSlots(15, 21);
const NOTES = ['', '월,수 저녁 가능', '화 6시 이후 가능', '주말만 가능', '평일 저녁 8시 이전', ''];
const THIS_MONDAY = mondayOf(new Date());

function generateStudentsForTeacher(teacherId, count) {
  const students = [];
  for (let i = 0; i < count; i++) {
    const seed = teacherId.charCodeAt(teacherId.length - 1) * 97 + i * 13;
    const product = pick(MOCK_PRODUCTS, seed);
    const startWeek = addWeeks(THIS_MONDAY, -((seed % 6) - 1));
    students.push({
      id: uid(),
      teacherId,
      status: pick(MOCK_STATUSES, seed + (i % 3 === 0 ? 1 : 0)),
      memberNo: String(1400000 + ((seed * 37) % 200000)),
      name: randomName(seed),
      grade: pick(GRADES, seed + 2),
      level: pick(LEVELS, seed + 5),
      product,
      startWeek,
      weekday: pick(WEEKDAYS, seed + 1),
      time: pick(MOCK_TIME_SLOTS, seed + 4),
      availableNote: pick(NOTES, seed + 6),
      memo: i % 5 === 0 ? '학부모 통화 선호 시간대: 저녁 8시 이후' : '',
      holidayPeriods:
        i % 7 === 0
          ? [{ id: uid(), startDate: addWeeks(THIS_MONDAY, 0), endDate: addWeeks(THIS_MONDAY, 2), reason: '타 클래스(레벨업 테스트반) 참여' }]
          : [],
      important: i % 9 === 0,
    });
  }
  return students;
}
function generateAllMockStudents() {
  const all = [];
  for (const teacher of TEACHERS) {
    const count = 12 + (teacher.name.charCodeAt(0) % 10);
    all.push(...generateStudentsForTeacher(teacher.id, count));
  }
  return all;
}

// ---------- shared data layer ----------
// SHARED data (students / teams / teachers / adminPassword) lives in Supabase when
// configured (window.SUPABASE_CONFIG), so every visitor sees the same content in
// real time. When Supabase isn't configured yet, it falls back to this browser's
// localStorage so the app still works standalone.
const SHARED_TABLE = 'scheduler_state';
const SHARED_ROW_ID = 'shared';
const LOCAL_FALLBACK_KEY = 'scheduler-shared-fallback-v1';
const LOCAL_UI_KEY = 'scheduler-ui-prefs-v1';

function defaultSharedData() {
  return {
    students: generateAllMockStudents(),
    teams: TEAMS.slice(),
    teachers: TEACHERS.slice(),
    adminPassword: null,
  };
}

function isSupabaseConfigured() {
  const cfg = window.SUPABASE_CONFIG;
  return !!(cfg && cfg.url && cfg.anonKey && !cfg.url.includes('YOUR_') && !cfg.anonKey.includes('YOUR_'));
}

function migrateSharedData(data) {
  if (!data || !Array.isArray(data.students)) return defaultSharedData();
  if (!Array.isArray(data.teams) || data.teams.length === 0) data.teams = TEAMS.slice();
  if (!Array.isArray(data.teachers) || data.teachers.length === 0) data.teachers = TEACHERS.slice();
  if (data.adminPassword === undefined) data.adminPassword = null;
  for (const s of data.students) {
    if (s.important === undefined) s.important = false;
  }
  return data;
}

// Custom hook: shared, synced data + a setter that persists (Supabase or localStorage).
function useSharedData() {
  const [data, setData] = useState(() => {
    if (isSupabaseConfigured()) return null; // loading until first fetch resolves
    try {
      const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
      if (raw) return migrateSharedData(JSON.parse(raw));
    } catch (e) {
      console.warn('로컬 데이터를 불러오지 못했습니다', e);
    }
    return defaultSharedData();
  });
  const [connected, setConnected] = useState(!isSupabaseConfigured() ? 'local' : 'connecting');
  const clientRef = useRef(null);
  const writeTimerRef = useRef(null);
  const latestDataRef = useRef(data);
  latestDataRef.current = data;

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let cancelled = false;

    async function init() {
      try {
        const { createClient } = await import(
          'https://esm.sh/@supabase/supabase-js@2'
        );
        const client = createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
        clientRef.current = client;

        const { data: rows, error } = await client
          .from(SHARED_TABLE)
          .select('data')
          .eq('id', SHARED_ROW_ID)
          .maybeSingle();

        if (cancelled) return;

        if (error) throw error;

        if (rows && rows.data) {
          setData(migrateSharedData(rows.data));
        } else {
          const fresh = defaultSharedData();
          await client.from(SHARED_TABLE).upsert({ id: SHARED_ROW_ID, data: fresh });
          if (!cancelled) setData(fresh);
        }
        if (!cancelled) setConnected('online');

        client
          .channel('scheduler_state_changes')
          .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: SHARED_TABLE, filter: `id=eq.${SHARED_ROW_ID}` },
            (payload) => {
              if (payload.new && payload.new.data) {
                setData(migrateSharedData(payload.new.data));
              }
            }
          )
          .subscribe();
      } catch (e) {
        console.error('Supabase 연결 실패, 이 브라우저에만 저장하는 방식으로 전환합니다', e);
        if (cancelled) return;
        setConnected('error');
        try {
          const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
          setData(raw ? migrateSharedData(JSON.parse(raw)) : defaultSharedData());
        } catch {
          setData(defaultSharedData());
        }
      }
    }

    init();
    return () => {
      cancelled = true;
      if (clientRef.current) clientRef.current.removeAllChannels();
    };
  }, []);

  // debounced persistence whenever `data` changes locally
  useEffect(() => {
    if (data === null) return;
    if (writeTimerRef.current) clearTimeout(writeTimerRef.current);
    writeTimerRef.current = setTimeout(() => {
      const snapshot = latestDataRef.current;
      if (clientRef.current && connected !== 'error') {
        clientRef.current
          .from(SHARED_TABLE)
          .update({ data: snapshot })
          .eq('id', SHARED_ROW_ID)
          .then(({ error }) => {
            if (error) console.error('공유 저장 실패', error);
          });
      } else {
        try {
          localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(snapshot));
        } catch (e) {
          console.warn('로컬 저장 실패', e);
        }
      }
    }, 500);
    return () => clearTimeout(writeTimerRef.current);
  }, [data, connected]);

  const updateData = useCallback((updater) => {
    setData((prev) => (prev ? updater(prev) : prev));
  }, []);

  return { data, updateData, connected };
}

// ---------- local (per-browser) UI state + combined app context ----------
const AppContext = createContext(null);

function loadUiPrefs() {
  try {
    const raw = localStorage.getItem(LOCAL_UI_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return {};
}

function AppProvider({ children, entry }) {
  const { data, updateData, connected } = useSharedData();
  const uiPrefs = useMemo(loadUiPrefs, []);

  const [role, setRoleState] = useState(entry === 'admin' ? 'teacher' : 'teacher');
  const [selectedTeamId, setSelectedTeamIdState] = useState(uiPrefs.selectedTeamId || TEAMS[0].id);
  const [selectedTeacherId, setSelectedTeacherIdState] = useState(uiPrefs.selectedTeacherId || '');
  const [filters, setFiltersState] = useState({ search: '', status: 'all', product: 'all', level: 'all' });
  const [baseMonday] = useState(mondayOf(new Date()));
  const [adminView, setAdminView] = useState('members');

  // persist lightweight UI prefs locally (not shared across devices, just convenience)
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_UI_KEY, JSON.stringify({ selectedTeamId, selectedTeacherId }));
    } catch {
      /* ignore */
    }
  }, [selectedTeamId, selectedTeacherId]);

  // once shared data has loaded, make sure selectedTeacherId points at something real
  useEffect(() => {
    if (!data) return;
    const teamExists = data.teams.some((t) => t.id === selectedTeamId);
    const effectiveTeamId = teamExists ? selectedTeamId : data.teams[0]?.id ?? '';
    if (!teamExists) setSelectedTeamIdState(effectiveTeamId);
    const teacherValid = data.teachers.some((t) => t.id === selectedTeacherId && t.teamId === effectiveTeamId);
    if (!teacherValid) {
      const fallback = data.teachers.find((t) => t.teamId === effectiveTeamId);
      setSelectedTeacherIdState(fallback ? fallback.id : '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const actions = useMemo(
    () => ({
      setRole: (r) => setRoleState(r),
      setAdminView,
      setSelectedTeam: (teamId) => {
        setSelectedTeamIdState(teamId);
        const first = (data?.teachers || []).find((t) => t.teamId === teamId);
        setSelectedTeacherIdState(first ? first.id : '');
      },
      setSelectedTeacher: (teacherId) => setSelectedTeacherIdState(teacherId),
      setFilters: (patch) => setFiltersState((f) => ({ ...f, ...patch })),

      setAdminPassword: (password) => updateData((s) => ({ ...s, adminPassword: password })),
      verifyAdminPassword: (password) => (data ? data.adminPassword === password : false),

      addTeam: (name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const newTeam = { id: 'team-' + uid(), name: trimmed };
        updateData((s) => ({ ...s, teams: [...s.teams, newTeam] }));
        setSelectedTeamIdState(newTeam.id);
        setSelectedTeacherIdState('');
      },
      removeTeam: (teamId) => {
        updateData((s) => {
          const teachersInTeam = s.teachers.filter((t) => t.teamId === teamId);
          const teacherIds = new Set(teachersInTeam.map((t) => t.id));
          return {
            ...s,
            teams: s.teams.filter((t) => t.id !== teamId),
            teachers: s.teachers.filter((t) => t.teamId !== teamId),
            students: s.students.filter((st) => !teacherIds.has(st.teacherId)),
          };
        });
      },
      addTeacher: (teamId, name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const newTeacher = { id: 'teacher-' + uid(), teamId, name: trimmed };
        updateData((s) => ({ ...s, teachers: [...s.teachers, newTeacher] }));
        setSelectedTeamIdState(teamId);
        setSelectedTeacherIdState(newTeacher.id);
      },
      removeTeacher: (teacherId) => {
        updateData((s) => ({
          ...s,
          teachers: s.teachers.filter((t) => t.id !== teacherId),
          students: s.students.filter((st) => st.teacherId !== teacherId),
        }));
        setSelectedTeacherIdState((cur) => (cur === teacherId ? '' : cur));
      },

      updateStudent: (id, patch) =>
        updateData((s) => ({ ...s, students: s.students.map((st) => (st.id === id ? { ...st, ...patch } : st)) })),
      addStudent: (teacherId) =>
        updateData((s) => ({
          ...s,
          students: [
            ...s.students,
            {
              id: uid(),
              teacherId,
              status: '시도 전',
              memberNo: '',
              name: '',
              grade: '',
              level: '1',
              product: '전과목',
              startWeek: baseMonday,
              weekday: '월',
              time: '15:00',
              availableNote: '',
              memo: '',
              holidayPeriods: [],
              important: false,
            },
          ],
        })),
      addStudentsBulk: (teacherId, rows) =>
        updateData((s) => ({
          ...s,
          students: [
            ...s.students,
            ...rows.map((r) => ({
              id: uid(),
              teacherId,
              status: '시도 전',
              memberNo: r.memberNo || '',
              name: r.name || '',
              grade: r.grade || '',
              level: r.level || '1',
              product: r.product || '전과목',
              startWeek: baseMonday,
              weekday: r.weekday || '월',
              time: r.time || '15:00',
              availableNote: '',
              memo: '',
              holidayPeriods: [],
              important: false,
            })),
          ],
        })),
      removeStudent: (id) => updateData((s) => ({ ...s, students: s.students.filter((st) => st.id !== id) })),
      addHolidayPeriod: (studentId, hp) =>
        updateData((s) => ({
          ...s,
          students: s.students.map((st) =>
            st.id === studentId ? { ...st, holidayPeriods: [...st.holidayPeriods, { ...hp, id: uid() }] } : st
          ),
        })),
      removeHolidayPeriod: (studentId, holidayId) =>
        updateData((s) => ({
          ...s,
          students: s.students.map((st) =>
            st.id === studentId
              ? { ...st, holidayPeriods: st.holidayPeriods.filter((h) => h.id !== holidayId) }
              : st
          ),
        })),
      moveStudentToSlot: (studentId, weekday, time) =>
        updateData((s) => ({
          ...s,
          students: s.students.map((st) => (st.id === studentId ? { ...st, weekday, time } : st)),
        })),
    }),
    [data, updateData, baseMonday]
  );

  const value = useMemo(
    () => ({
      ...(data || defaultSharedData()),
      loading: data === null,
      connected,
      entry,
      role,
      selectedTeamId,
      selectedTeacherId,
      filters,
      baseMonday,
      adminView,
      ...actions,
    }),
    [data, connected, entry, role, selectedTeamId, selectedTeacherId, filters, baseMonday, adminView, actions]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// ---------- UI primitives ----------
const TONE_CLASSES = {
  gray: 'bg-gray-100 text-gray-600',
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-600',
  black: 'bg-gray-900 text-white',
  purple: 'bg-purple-50 text-purple-600',
};
function Badge({ children, tone = 'gray', className }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-none', TONE_CLASSES[tone], className)}>
      {children}
    </span>
  );
}

function Card({ children, className }) {
  return <div className={cn('rounded-2xl border border-gray-200 bg-white shadow-sm', className)}>{children}</div>;
}

const BTN_VARIANT = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  outline: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
};
const BTN_SIZE = { sm: 'h-7 px-2.5 text-xs', md: 'h-9 px-3.5 text-sm' };
function Button({ className, variant = 'primary', size = 'md', children, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none',
        BTN_VARIANT[variant], BTN_SIZE[size], className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-8 rounded-lg border border-gray-200 bg-white px-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100',
        className
      )}
      {...props}
    />
  );
}

function Select({ className, children, ...props }) {
  return (
    <div className="relative inline-block w-full">
      <select
        className={cn(
          'h-8 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-2.5 pr-7 text-sm text-gray-800 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

// Lightweight CSS-only hover tooltip (no portal, no Radix)
function Tooltip({ trigger, content }) {
  return (
    <span className="sch-tooltip-wrap">
      {trigger}
      <span className="sch-tooltip-bubble">{content}</span>
    </span>
  );
}

function Modal({ open, onClose, title, children, widthClassName = 'max-w-sm' }) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 px-4" onClick={onClose}>
      <div className={cn('w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-xl', widthClassName)} onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Simple click-outside-to-close floating panel anchored under its trigger's container.
function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onOutside]);
}

function Checkbox({ checked, onChange, label, className }) {
  return (
    <label className={cn('inline-flex cursor-pointer select-none items-center gap-1.5', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-3.5 w-3.5 rounded border-gray-300 text-red-500 focus:ring-red-300"
      />
      {label && <span className="text-xs text-gray-500">{label}</span>}
    </label>
  );
}

// ---------- member list components ----------
function MondayPicker({ value, onChange }) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => {
        if (!e.target.value) return;
        const snapped = mondayOf(new Date(e.target.value + 'T00:00:00'));
        onChange(snapped);
      }}
      className="h-8 rounded-lg border border-gray-200 bg-white px-2 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      title="선택한 주의 월요일로 자동 지정됩니다"
    />
  );
}

function HolidayEditor({ student }) {
  const { addHolidayPeriod, removeHolidayPeriod } = useApp();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  return (
    <div>
      <div className="mb-1.5 flex flex-wrap gap-1.5">
        {student.holidayPeriods.length === 0 && (
          <span className="text-xs text-gray-400">등록된 결석(타 클래스 참여) 기간이 없습니다</span>
        )}
        {student.holidayPeriods.map((hp) => (
          <span key={hp.id} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[11px] text-gray-600">
            {formatMonthDay(hp.startDate)} ~ {formatMonthDay(hp.endDate)}
            <button onClick={() => removeHolidayPeriod(student.id, hp.id)} className="text-gray-400 hover:text-gray-700">
              <XIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-[130px]" />
        <span className="text-xs text-gray-400">~</span>
        <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="w-[130px]" />
        <Button
          size="sm"
          variant="outline"
          disabled={!start || !end}
          onClick={() => {
            if (!start || !end) return;
            addHolidayPeriod(student.id, { startDate: start, endDate: end, reason: '타 클래스 참여' });
            setStart('');
            setEnd('');
          }}
        >
          <PlusIcon className="h-3.5 w-3.5" /> 추가
        </Button>
      </div>
    </div>
  );
}

const PRODUCT_TONE = { 단과: 'gray', 전과목: 'gray', 자주표A: 'blue', 자주표B: 'blue' };

function SuggestionRow({ student, weekMondays }) {
  const { students, moveStudentToSlot } = useApp();
  const teacherPeers = useMemo(() => students.filter((s) => s.teacherId === student.teacherId), [students, student.teacherId]);
  const suggestions = useMemo(
    () => suggestSlotsForNote(student.availableNote, teacherPeers, weekMondays, student.id),
    [student.availableNote, teacherPeers, weekMondays, student.id]
  );

  if (!student.availableNote.trim() || suggestions.length === 0) return null;

  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-1 rounded-lg bg-blue-50/60 px-2 py-1.5">
      <LightbulbIcon className="h-3 w-3 shrink-0 text-blue-400" />
      <span className="text-[10px] font-medium text-blue-500">추천 시간:</span>
      {suggestions.map((sug) => (
        <button
          key={`${sug.weekday}-${sug.time}`}
          onClick={() => moveStudentToSlot(student.id, sug.weekday, sug.time)}
          className={cn(
            'rounded-md border px-1.5 py-[2px] text-[10px] font-medium transition-colors',
            sug.badge === 'WARN'
              ? 'border-amber-200 bg-white text-amber-600 hover:bg-amber-50'
              : 'border-blue-200 bg-white text-blue-600 hover:bg-blue-100'
          )}
          title={sug.badge === 'WARN' ? '격주 상대편 주에는 정원이 찰 수 있어요' : '추천 시간에 배정'}
        >
          {sug.weekday} {sug.time}
        </button>
      ))}
    </div>
  );
}

function MemberRow({ student, isDuplicate, weekMondays, rowRef, highlighted }) {
  const [expanded, setExpanded] = useState(false);
  const { role, updateStudent, removeStudent, students } = useApp();
  const canEditAdminFields = role === 'admin';

  function patch(p) {
    updateStudent(student.id, p);
  }

  const capacityBadge = useMemo(
    () => capacityBadgeForSlot(students.filter((s) => s.teacherId === student.teacherId && s.id !== student.id), student.weekday, student.time, weekMondays),
    [students, student.teacherId, student.id, student.weekday, student.time, weekMondays]
  );

  return (
    <div
      ref={rowRef}
      className={cn(
        'rounded-2xl border bg-white p-3 shadow-sm transition-all hover:shadow-md',
        highlighted ? 'border-blue-400 ring-2 ring-blue-200' : 'border-gray-200'
      )}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/student-id', student.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setExpanded((v) => !v)} className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100">
          {expanded ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
        </button>

        <Checkbox checked={!!student.important} onChange={(v) => patch({ important: v })} />

        <Input value={student.memberNo} onChange={(e) => patch({ memberNo: e.target.value })} placeholder="회원번호" disabled={!canEditAdminFields} className="w-[88px] shrink-0" />
        <Input
          value={student.name}
          onChange={(e) => patch({ name: e.target.value })}
          placeholder="회원명"
          className={cn('w-[80px] shrink-0 font-medium', student.important && 'text-red-600')}
        />

        {isDuplicate && (
          <span title="동일 회원번호가 중복 등록되어 있습니다">
            <AlertIcon className="h-4 w-4 shrink-0 text-red-500" />
          </span>
        )}

        <Input value={student.grade} onChange={(e) => patch({ grade: e.target.value })} placeholder="학년" disabled={!canEditAdminFields} className="w-[48px] shrink-0" />

        <div className="w-[74px] shrink-0">
          <Select value={student.level} onChange={(e) => patch({ level: e.target.value })}>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </Select>
        </div>

        <div className="w-[80px] shrink-0">
          <Select value={student.product} onChange={(e) => patch({ product: e.target.value })}>
            {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
          </Select>
        </div>
        <Badge tone={PRODUCT_TONE[student.product]} className="shrink-0">{student.product}</Badge>

        <div className="w-[54px] shrink-0">
          <Select value={student.weekday} onChange={(e) => patch({ weekday: e.target.value })}>
            {WEEKDAYS.map((w) => <option key={w} value={w}>{w}</option>)}
          </Select>
        </div>
        <div className="w-[80px] shrink-0">
          <Select value={student.time} onChange={(e) => patch({ time: e.target.value })}>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>

        <div className="ml-auto w-[92px] shrink-0">
          <Select value={student.status} onChange={(e) => patch({ status: e.target.value })}>
            {MEMBER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 pl-8 text-[11px] text-gray-500">
        <span className="inline-flex items-center gap-1">
          <span className="text-gray-400">시작</span> {formatMonthDay(student.startWeek)}
        </span>
        <span className="inline-flex min-w-0 max-w-[280px] items-center gap-1 truncate">
          <span className="shrink-0 text-gray-400">메모</span>
          <span className={cn('truncate', student.important ? 'font-semibold text-red-600' : '')}>
            {student.memo ? student.memo : <span className="text-gray-300">없음</span>}
          </span>
        </span>
        {student.important && (
          <Badge tone="red" className="shrink-0">중요</Badge>
        )}
        {student.holidayPeriods.length > 0 && (
          <Badge tone="gray" className="shrink-0">결석기간 {student.holidayPeriods.length}</Badge>
        )}
      </div>

      {capacityBadge && (
        <div className={cn('mt-1.5 ml-8 flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium', capacityBadge === 'FULL' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600')}>
          <AlertIcon className="h-3 w-3 shrink-0" />
          {capacityBadge === 'FULL' ? '정원 초과입니다 (이 시간대는 이미 8명입니다)' : '격주 상대편 주에 정원 초과가 예상됩니다'}
        </div>
      )}

      <SuggestionRow student={student} weekMondays={weekMondays} />

      {expanded && (
        <div className="mt-3 space-y-3 border-t border-gray-100 pt-3 pl-8">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gray-400">수업 시작 주차 (해당 주 월요일)</label>
              <MondayPicker value={student.startWeek} onChange={(v) => patch({ startWeek: v })} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gray-400">비고 (가능 시간대 등)</label>
              <Input
                value={student.availableNote}
                onChange={(e) => patch({ availableNote: e.target.value })}
                disabled={!canEditAdminFields}
                placeholder="예: 월,수 저녁 가능"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium text-gray-400">메모 (전체 내용 수정)</label>
            <Input value={student.memo} onChange={(e) => patch({ memo: e.target.value })} placeholder="선생님 메모" className="w-full" />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium text-gray-400">결석(타 클래스 참여) 기간</label>
            <HolidayEditor student={student} />
          </div>

          <div className="flex justify-end">
            <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => removeStudent(student.id)}>
              <TrashIcon className="h-3.5 w-3.5" /> 회원 삭제
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}


function MemberList({ statFilter, onClearStatFilter, weekMondays, onJumpToStudent, highlightedId }) {
  const { students, teachers, selectedTeacherId, filters, setFilters, addStudent, addStudentsBulk } = useApp();
  const fileInputRef = useRef(null);
  const rowRefs = useRef({});
  const [importMsg, setImportMsg] = useState('');

  const selectedTeacherName = useMemo(() => teachers.find((t) => t.id === selectedTeacherId)?.name ?? '교사', [teachers, selectedTeacherId]);

  const teacherStudents = useMemo(() => students.filter((s) => s.teacherId === selectedTeacherId), [students, selectedTeacherId]);
  const duplicateNos = useMemo(() => findDuplicateMemberNos(teacherStudents), [teacherStudents]);

  const filtered = useMemo(() => {
    return teacherStudents.filter((s) => {
      if (statFilter && s.status !== statFilter) return false;
      if (!statFilter && filters.status !== 'all' && s.status !== filters.status) return false;
      if (filters.product !== 'all' && s.product !== filters.product) return false;
      if (filters.level !== 'all' && s.level !== filters.level) return false;
      if (filters.search.trim()) {
        const q = filters.search.trim().toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.memberNo.includes(q)) return false;
      }
      return true;
    });
  }, [teacherStudents, filters, statFilter]);

  useEffect(() => {
    if (highlightedId && rowRefs.current[highlightedId]) {
      rowRefs.current[highlightedId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedId]);

  async function handleFileChosen(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const { rows, matchedFields } = await parseStudentFile(file);
      if (rows.length === 0) {
        setImportMsg('회원 데이터를 인식하지 못했습니다. 헤더에 회원번호/이름/학년/레벨/상품/요일/시간 항목이 있는지 확인해주세요.');
      } else {
        addStudentsBulk(selectedTeacherId, rows);
        setImportMsg(`${rows.length}명 추가됨 (인식된 항목: ${matchedFields.join(', ') || '없음'})`);
      }
    } catch (err) {
      console.error(err);
      setImportMsg('파일을 읽는 중 오류가 발생했습니다.');
    } finally {
      e.target.value = '';
      setTimeout(() => setImportMsg(''), 6000);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 space-y-2.5 border-b border-gray-100 bg-white px-4 py-3">
        {statFilter && (
          <div className="flex items-center justify-between rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs text-blue-700">
            <span>'{statFilter}' 상태만 보는 중</span>
            <button onClick={onClearStatFilter} className="font-medium underline">전체 보기</button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <Input value={filters.search} onChange={(e) => setFilters({ search: e.target.value })} placeholder="회원번호 또는 회원명 검색" className="w-full pl-8" />
          </div>
          <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileChosen} />
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} title="엑셀 파일을 업로드해서 회원을 자동으로 추가">
            <UploadIcon className="h-3.5 w-3.5" /> 엑셀 업로드
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportStudentsToXlsx(teacherStudents, selectedTeacherName)} disabled={teacherStudents.length === 0}>
            <DownloadIcon className="h-3.5 w-3.5" /> 엑셀 다운로드
          </Button>
          <Button size="sm" onClick={() => addStudent(selectedTeacherId)}>
            <UserPlusIcon className="h-3.5 w-3.5" /> 회원 추가
          </Button>
        </div>
        {importMsg && <div className="rounded-lg bg-gray-50 px-2.5 py-1.5 text-[11px] text-gray-600">{importMsg}</div>}
        <div className="flex items-center gap-2">
          <div className="w-24">
            <Select value={filters.status} onChange={(e) => setFilters({ status: e.target.value })}>
              <option value="all">전체 상태</option>
              {MEMBER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
          <div className="w-24">
            <Select value={filters.product} onChange={(e) => setFilters({ product: e.target.value })}>
              <option value="all">전체 상품</option>
              {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </div>
          <div className="w-24">
            <Select value={filters.level} onChange={(e) => setFilters({ level: e.target.value })}>
              <option value="all">전체 레벨</option>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </Select>
          </div>
          <span className="ml-auto text-xs text-gray-400">{filtered.length}명 표시 중</span>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {filtered.length === 0 && <div className="flex h-32 items-center justify-center text-sm text-gray-400">표시할 회원이 없습니다</div>}
        {filtered.map((s) => (
          <MemberRow
            key={s.id}
            student={s}
            isDuplicate={!!s.memberNo && duplicateNos.has(s.memberNo)}
            weekMondays={weekMondays}
            rowRef={(el) => { rowRefs.current[s.id] = el; }}
            highlighted={highlightedId === s.id}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- schedule panel components ----------
const OCCUPANT_COLOR_CLASSES = {
  black: 'text-gray-800 border-gray-200 bg-gray-50',
  blue: 'text-blue-700 border-blue-200 bg-blue-50',
  gray: 'text-gray-400 border-gray-200 bg-gray-50 italic',
};

function StudentChip({ occupant, onDragStart }) {
  return (
    <Tooltip
      trigger={
        <div
          draggable
          onDragStart={onDragStart}
          className={cn('cursor-grab truncate rounded-md border px-1.5 py-[3px] text-[11px] leading-tight active:cursor-grabbing', OCCUPANT_COLOR_CLASSES[occupant.color])}
        >
          {occupant.name}
          {occupant.onLeave && <span className="ml-0.5">(알)</span>}
        </div>
      }
      content={
        <div className="space-y-1">
          <div className="font-semibold text-gray-800">{occupant.name} · Lv.{occupant.level}</div>
          {occupant.onLeave && <div className="text-gray-500">(알) 현재 다른 클래스 참여 중</div>}
          <div className="text-gray-500">상품: {occupant.product}</div>
          {occupant.availableNote && <div className="text-gray-500">가능 시간: {occupant.availableNote}</div>}
          {occupant.memo && <div className="text-gray-500">메모: {occupant.memo}</div>}
        </div>
      }
    />
  );
}

function CoachingRoomCard({ slot }) {
  const { moveStudentToSlot } = useApp();
  const [dragOver, setDragOver] = useState(false);

  const activeCount = slot.occupants.filter((o) => !o.onLeave).length;
  const levels = Array.from(new Set(slot.occupants.map((o) => o.level)));

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const studentId = e.dataTransfer.getData('text/student-id');
        if (studentId) moveStudentToSlot(studentId, slot.weekday, slot.time);
      }}
      className={cn(
        'min-h-[58px] rounded-lg border p-1 transition-colors',
        slot.capacityBadge === 'FULL' ? 'border-red-200 bg-red-50/60' : slot.capacityBadge === 'WARN' ? 'border-amber-200 bg-amber-50/60' : 'border-gray-100 bg-gray-50/50',
        dragOver && 'ring-2 ring-blue-400'
      )}
    >
      {(slot.capacityBadge || slot.levelMixWarning) && (
        <div className="mb-1 flex flex-wrap gap-1">
          {slot.capacityBadge === 'FULL' && (
            <span className="inline-flex items-center gap-0.5 rounded bg-red-600 px-1.5 py-[1px] text-[10px] font-semibold text-white">FULL</span>
          )}
          {slot.capacityBadge === 'WARN' && (
            <span className="inline-flex items-center gap-0.5 rounded bg-amber-500 px-1.5 py-[1px] text-[10px] font-semibold text-white">
              <AlertIcon className="h-2.5 w-2.5" /> 정원 초과 예정
            </span>
          )}
          {slot.levelMixWarning && (
            <span className="inline-flex items-center gap-0.5 rounded bg-purple-100 px-1.5 py-[1px] text-[10px] font-medium text-purple-700">
              <LayersIcon className="h-2.5 w-2.5" /> 레벨 혼합
            </span>
          )}
        </div>
      )}

      {slot.occupants.length > 0 && (
        <div className="mb-1 flex items-center justify-between px-0.5">
          <span className="flex items-center gap-1 text-sm font-extrabold leading-none">
            {levels.slice(0, 2).map((lv, i) => (
              <span key={lv} style={{ color: levelColor(lv) }}>
                {i > 0 && <span className="text-gray-300">/</span>}Lv.{lv}
              </span>
            ))}
            {levels.length > 2 && <span className="text-gray-400">…</span>}
          </span>
          <span className={cn('text-xs font-bold', activeCount >= FIXED_CAPACITY ? 'text-red-600' : 'text-sky-600')}>{activeCount}/{FIXED_CAPACITY}</span>
        </div>
      )}

      <div className="space-y-0.5">
        {slot.occupants.map((o) => (
          <StudentChip
            key={o.studentId}
            occupant={o}
            onDragStart={(e) => { e.dataTransfer.setData('text/student-id', o.studentId); e.dataTransfer.effectAllowed = 'move'; }}
          />
        ))}
      </div>
    </div>
  );
}

function WeekBlock({ label, grid }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-2 px-1">
        <h3 className="text-sm font-semibold text-gray-800">{label}</h3>
        <Badge tone={grid.weekLabel === 'A' ? 'blue' : 'gray'}>{grid.weekLabel}주</Badge>
        <span className="text-xs text-gray-400">{formatMonthDay(grid.weekMonday)} ~ {formatMonthDay(dateOfWeekday(grid.weekMonday, '금'))}</span>
      </div>
      <div className="grid grid-cols-[48px_repeat(5,1fr)] gap-1.5">
        <div />
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="rounded-lg bg-gray-50 py-1.5 text-center">
            <div className="text-xs font-semibold text-gray-700">{wd}</div>
            <div className="text-[10px] text-gray-400">{formatMonthDay(dateOfWeekday(grid.weekMonday, wd))}</div>
          </div>
        ))}
        {TIME_SLOTS.map((time) => (
          <Fragment key={time}>
            <div className="flex items-center justify-end pr-1 text-[10px] font-medium text-gray-400">{time}</div>
            {WEEKDAYS.map((wd) => <CoachingRoomCard key={`${wd}-${time}`} slot={grid.slots[wd][time]} />)}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function SchedulePanel() {
  const { students, selectedTeacherId, baseMonday } = useApp();
  const teacherStudents = useMemo(() => students.filter((s) => s.teacherId === selectedTeacherId), [students, selectedTeacherId]);
  const weekMondays = useMemo(() => [baseMonday, addWeeks(baseMonday, 1)], [baseMonday]);
  const grids = useMemo(() => buildSchedule({ students: teacherStudents, weekMondays }), [teacherStudents, weekMondays]);

  return (
    <div className="h-full overflow-y-auto px-4 py-4">
      <WeekBlock label="이번 주" grid={grids[0]} />
      <WeekBlock label="다음 주" grid={grids[1]} />
    </div>
  );
}

// ---------- top bar ----------
function StatCard({ icon, label, value, tone, onClick, active }) {
  const Comp = onClick ? 'button' : 'div';
  return (
    <Comp
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left shadow-sm transition-all',
        onClick && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5',
        active ? 'border-blue-400 ring-2 ring-blue-200' : 'border-gray-200'
      )}
    >
      <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', tone)}>{icon}</div>
      <div>
        <div className="text-[11px] font-medium text-gray-400">{label}</div>
        <div className="text-lg font-semibold text-gray-900 leading-tight">{value}명</div>
      </div>
    </Comp>
  );
}

function ConnectionBadge({ connected }) {
  if (connected === 'online') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-600">
        <CloudIcon className="h-3 w-3" /> 실시간 공유중
      </span>
    );
  }
  if (connected === 'connecting') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-500">
        <CloudIcon className="h-3 w-3" /> 연결 중…
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-600" title="공유 데이터베이스가 설정되지 않아 이 브라우저에만 저장됩니다">
      <CloudOffIcon className="h-3 w-3" /> 이 브라우저에만 저장
    </span>
  );
}

function TopBar({ onRequestAdmin, onExitAdmin, onOpenManagement, activeStatFilter, onToggleStatFilter }) {
  const { students, teams, teachers, selectedTeamId, selectedTeacherId, setSelectedTeam, setSelectedTeacher, role, entry, connected } = useApp();

  const teachersInTeam = useMemo(() => teachers.filter((t) => t.teamId === selectedTeamId), [teachers, selectedTeamId]);
  const teacherStudents = useMemo(() => students.filter((s) => s.teacherId === selectedTeacherId), [students, selectedTeacherId]);

  const stats = useMemo(() => {
    const notStarted = teacherStudents.filter((s) => s.status === '시도 전').length;
    const inProgress = teacherStudents.filter((s) => s.status === '진행중').length;
    const done = teacherStudents.filter((s) => s.status === '완료').length;
    const transferred = teacherStudents.filter((s) => s.status === '이관회원').length;
    return { total: teacherStudents.length, notStarted, inProgress, done, transferred };
  }, [teacherStudents]);

  return (
    <div className="relative border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400">팀</span>
          <div className="w-32">
            <Select value={selectedTeamId} onChange={(e) => setSelectedTeam(e.target.value)}>
              {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400">교사</span>
          <div className="w-36">
            <Select value={selectedTeacherId} onChange={(e) => setSelectedTeacher(e.target.value)}>
              {teachersInTeam.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </Select>
          </div>
        </div>

        <ConnectionBadge connected={connected} />

        {entry === 'admin' && role === 'admin' && (
          <Button variant="outline" size="sm" onClick={onOpenManagement}>
            <GearIcon2 className="h-3.5 w-3.5" /> 팀·교사 관리
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          {entry === 'admin' && (
            role === 'admin' ? (
              <>
                <Badge tone="blue">관리자 모드</Badge>
                <Button variant="outline" size="sm" onClick={onExitAdmin}>
                  <UserIcon className="h-3.5 w-3.5" /> 교사 화면처럼 보기
                </Button>
              </>
            ) : (
              <Button variant="primary" size="sm" onClick={onRequestAdmin}>
                <ShieldIcon className="h-3.5 w-3.5" /> 관리자 인증
              </Button>
            )
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        <StatCard icon={<UsersIcon className="h-4 w-4 text-blue-600" />} label="총 회원" value={stats.total} tone="bg-blue-50" />
        <StatCard
          icon={<CircleDashedIcon className="h-4 w-4 text-gray-500" />}
          label="미완료"
          value={stats.notStarted}
          tone="bg-gray-100"
          onClick={() => onToggleStatFilter('시도 전')}
          active={activeStatFilter === '시도 전'}
        />
        <StatCard
          icon={<TrendUpIcon className="h-4 w-4 text-amber-600" />}
          label="진행중"
          value={stats.inProgress}
          tone="bg-amber-50"
          onClick={() => onToggleStatFilter('진행중')}
          active={activeStatFilter === '진행중'}
        />
        <StatCard
          icon={<CheckCircleIcon className="h-4 w-4 text-emerald-600" />}
          label="완료"
          value={stats.done}
          tone="bg-emerald-50"
          onClick={() => onToggleStatFilter('완료')}
          active={activeStatFilter === '완료'}
        />
        <StatCard
          icon={<SwapIcon className="h-4 w-4 text-purple-600" />}
          label="이관회원"
          value={stats.transferred}
          tone="bg-purple-50"
          onClick={() => onToggleStatFilter('이관회원')}
          active={activeStatFilter === '이관회원'}
        />
      </div>
    </div>
  );
}

// ---------- admin: login gate + team/teacher management page ----------
function AdminLoginDialog({ open, onClose, onSuccess }) {
  const { adminPassword, setAdminPassword, verifyAdminPassword } = useApp();
  const isSetupMode = adminPassword === null;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function reset() {
    setPassword('');
    setConfirmPassword('');
    setError('');
  }
  function handleClose() {
    reset();
    onClose();
  }
  function handleSubmit() {
    if (isSetupMode) {
      if (password.length < 4) return setError('비밀번호는 4자 이상으로 설정해주세요');
      if (password !== confirmPassword) return setError('비밀번호가 서로 일치하지 않습니다');
      setAdminPassword(password);
      reset();
      onSuccess();
    } else if (verifyAdminPassword(password)) {
      reset();
      onSuccess();
    } else {
      setError('비밀번호가 올바르지 않습니다');
    }
  }

  return (
    <Modal open={open} onClose={handleClose} title={isSetupMode ? '관리자 비밀번호 설정' : '관리자 인증'}>
      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-xs text-blue-700">
          <KeyIcon className="h-3.5 w-3.5 shrink-0" />
          {isSetupMode ? '관리자 모드에 처음 진입합니다. 사용할 비밀번호를 설정해주세요.' : '비밀번호를 입력하세요.'}
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-medium text-gray-400">{isSetupMode ? '새 비밀번호' : '비밀번호'}</label>
          <Input
            type="password"
            value={password}
            autoFocus
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            onKeyDown={(e) => { if (e.key === 'Enter' && !isSetupMode) handleSubmit(); }}
            className="w-full"
            placeholder="비밀번호 입력"
          />
        </div>
        {isSetupMode && (
          <div>
            <label className="mb-1 block text-[11px] font-medium text-gray-400">비밀번호 확인</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
              className="w-full"
              placeholder="비밀번호 다시 입력"
            />
          </div>
        )}
        {error && <div className="text-xs text-red-500">{error}</div>}
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="outline" size="sm" onClick={handleClose}>취소</Button>
          <Button size="sm" onClick={handleSubmit}>{isSetupMode ? '설정하고 입장' : '입장'}</Button>
        </div>
      </div>
    </Modal>
  );
}

function TeamTeacherManager({ onBack }) {
  const { teams, teachers, students, addTeam, removeTeam, addTeacher, removeTeacher, setAdminPassword } = useApp();
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeacherName, setNewTeacherName] = useState({});
  const [pwOpen, setPwOpen] = useState(false);
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');
  const [pwError, setPwError] = useState('');

  const teachersByTeam = useMemo(() => {
    const map = {};
    for (const team of teams) map[team.id] = teachers.filter((t) => t.teamId === team.id);
    return map;
  }, [teams, teachers]);

  const studentCountByTeacher = useMemo(() => {
    const map = {};
    for (const st of students) map[st.teacherId] = (map[st.teacherId] ?? 0) + 1;
    return map;
  }, [students]);

  function handleAddTeam() {
    if (!newTeamName.trim()) return;
    addTeam(newTeamName);
    setNewTeamName('');
  }
  function handleAddTeacher(teamId) {
    const name = (newTeacherName[teamId] ?? '').trim();
    if (!name) return;
    addTeacher(teamId, name);
    setNewTeacherName((prev) => ({ ...prev, [teamId]: '' }));
  }
  function handleRemoveTeam(teamId, teamName) {
    const count = teachersByTeam[teamId]?.length ?? 0;
    const studentCount = (teachersByTeam[teamId] ?? []).reduce((sum, t) => sum + (studentCountByTeacher[t.id] ?? 0), 0);
    const msg = count > 0
      ? `'${teamName}' 팀을 삭제하면 소속 교사 ${count}명과 배정된 회원 ${studentCount}명이 함께 삭제됩니다. 계속할까요?`
      : `'${teamName}' 팀을 삭제할까요?`;
    if (window.confirm(msg)) removeTeam(teamId);
  }
  function handleRemoveTeacher(teacherId, teacherName) {
    const count = studentCountByTeacher[teacherId] ?? 0;
    const msg = count > 0
      ? `${teacherName} 선생님을 삭제하면 배정된 회원 ${count}명도 함께 삭제됩니다. 계속할까요?`
      : `${teacherName} 선생님을 삭제할까요?`;
    if (window.confirm(msg)) removeTeacher(teacherId);
  }
  function handleChangePassword() {
    setPwError('');
    if (newPw.length < 4) return setPwError('비밀번호는 4자 이상으로 설정해주세요');
    if (newPw !== newPwConfirm) return setPwError('비밀번호가 서로 일치하지 않습니다');
    setAdminPassword(newPw);
    setNewPw('');
    setNewPwConfirm('');
    setPwOpen(false);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-gray-900">팀 · 교사 관리</h2>
        </div>
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeftIcon className="h-3.5 w-3.5" /> 회원 리스트로
        </Button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <Card className="p-4">
          <h3 className="mb-2 text-xs font-semibold text-gray-500">새 팀 추가</h3>
          <div className="flex items-center gap-1.5">
            <Input value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTeam()} placeholder="예: CNE3" className="flex-1" />
            <Button size="sm" onClick={handleAddTeam} disabled={!newTeamName.trim()}>
              <PlusIcon className="h-3.5 w-3.5" /> 팀 추가
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500">관리자 비밀번호</h3>
            <Button variant="ghost" size="sm" onClick={() => setPwOpen((v) => !v)}>
              <KeyIcon className="h-3.5 w-3.5" /> {pwOpen ? '닫기' : '변경'}
            </Button>
          </div>
          {pwOpen && (
            <div className="space-y-2">
              <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="새 비밀번호" className="w-full" />
              <Input type="password" value={newPwConfirm} onChange={(e) => setNewPwConfirm(e.target.value)} placeholder="새 비밀번호 확인" className="w-full" />
              {pwError && <div className="text-xs text-red-500">{pwError}</div>}
              <div className="flex justify-end">
                <Button size="sm" onClick={handleChangePassword}>저장</Button>
              </div>
            </div>
          )}
        </Card>

        {teams.map((team) => (
          <Card key={team.id} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-800">{team.name}</h3>
                <Badge tone="gray">{teachersByTeam[team.id]?.length ?? 0}명</Badge>
              </div>
              <button onClick={() => handleRemoveTeam(team.id, team.name)} className="text-gray-400 hover:text-red-500" title="팀 삭제">
                <TrashIcon className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mb-3 space-y-1">
              {(teachersByTeam[team.id] ?? []).length === 0 && <div className="text-xs text-gray-400">등록된 교사가 없습니다</div>}
              {(teachersByTeam[team.id] ?? []).map((teacher) => (
                <div key={teacher.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-2.5 py-1.5">
                  <span className="text-sm text-gray-700">{teacher.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400">회원 {studentCountByTeacher[teacher.id] ?? 0}명</span>
                    <button onClick={() => handleRemoveTeacher(teacher.id, teacher.name)} className="text-gray-400 hover:text-red-500" title="교사 삭제">
                      <TrashIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <Input
                value={newTeacherName[team.id] ?? ''}
                onChange={(e) => setNewTeacherName((prev) => ({ ...prev, [team.id]: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTeacher(team.id)}
                placeholder="새 교사 이름"
                className="flex-1"
              />
              <Button size="sm" variant="outline" onClick={() => handleAddTeacher(team.id)} disabled={!(newTeacherName[team.id] ?? '').trim()}>
                <PlusIcon className="h-3.5 w-3.5" /> 교사 추가
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------- resizable split ----------
function ResizableSplit({ left, right, defaultLeftPercent = 58, minPercent = 32, maxPercent = 78 }) {
  const containerRef = useRef(null);
  const [leftPercent, setLeftPercent] = useState(defaultLeftPercent);
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = useCallback(() => {
    setDragging(true);
    function handleMove(e) {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let pct = ((e.clientX - rect.left) / rect.width) * 100;
      pct = Math.min(maxPercent, Math.max(minPercent, pct));
      setLeftPercent(pct);
    }
    function handleUp() {
      setDragging(false);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    }
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  }, [minPercent, maxPercent]);

  return (
    <div ref={containerRef} className="flex h-full min-h-0 w-full">
      <div className="min-h-0 overflow-hidden" style={{ width: `${leftPercent}%` }}>{left}</div>
      <div onPointerDown={handlePointerDown} className={cn('group relative w-1.5 shrink-0 cursor-col-resize bg-transparent', dragging && 'bg-blue-100')}>
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gray-200 group-hover:bg-blue-300" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden" style={{ width: `${100 - leftPercent}%` }}>{right}</div>
    </div>
  );
}

// ---------- app shell (inside AppProvider) ----------
function AppShell() {
  const { role, setRole, entry, baseMonday, adminView, setAdminView } = useApp();
  const [loginOpen, setLoginOpen] = useState(false);
  const [statFilter, setStatFilter] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  const weekMondays = useMemo(() => [baseMonday, addWeeks(baseMonday, 1)], [baseMonday]);

  function handleRequestAdmin() {
    if (role === 'admin') {
      setAdminView('management');
      return;
    }
    setLoginOpen(true);
  }
  function handleAdminLoginSuccess() {
    setRole('admin');
    setAdminView('management');
    setLoginOpen(false);
  }
  function handleExitAdmin() {
    setRole('teacher');
    setAdminView('members');
  }
  function handleToggleStatFilter(status) {
    setStatFilter((cur) => (cur === status ? null : status));
  }
  function handleJumpToStudent(id) {
    setHighlightedId(id);
    setTimeout(() => setHighlightedId(null), 2500);
  }

  const showManagement = entry === 'admin' && role === 'admin' && adminView === 'management';

  return (
    <div className="flex h-screen flex-col bg-[#f7f8fa]">
      <TopBar
        onRequestAdmin={handleRequestAdmin}
        onExitAdmin={handleExitAdmin}
        onOpenManagement={() => setAdminView('management')}
        activeStatFilter={statFilter}
        onToggleStatFilter={handleToggleStatFilter}
      />
      <div className="min-h-0 flex-1">
        {showManagement ? (
          <TeamTeacherManager onBack={() => setAdminView('members')} />
        ) : (
          <ResizableSplit
            left={
              <MemberList
                statFilter={statFilter}
                onClearStatFilter={() => setStatFilter(null)}
                weekMondays={weekMondays}
                onJumpToStudent={handleJumpToStudent}
                highlightedId={highlightedId}
              />
            }
            right={<SchedulePanel />}
            defaultLeftPercent={58}
          />
        )}
      </div>
      {entry === 'admin' && (
        <AdminLoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={handleAdminLoginSuccess} />
      )}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#f7f8fa] text-sm text-gray-400">
      데이터를 불러오는 중…
    </div>
  );
}

function AppRoot() {
  const entry = window.SCHEDULER_ENTRY === 'admin' ? 'admin' : 'teacher';
  return (
    <AppProvider entry={entry}>
      <AppGate />
    </AppProvider>
  );
}

function AppGate() {
  const { loading } = useApp();
  if (loading) return <LoadingScreen />;
  return <AppShell />;
}

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(<AppRoot />);
