jest.mock('../lib/firebase', () => ({
  db: {},
  auth: {},
}));
import { addBoekje, archiveerBoekje, herstelBoekje, updateBoekje, subscribeToBoekjes } from '../lib/boekjes';
import { collection, addDoc, updateDoc, doc, onSnapshot, query, where } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(() => 'mockCollection'),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn((db, col, id) => ({ ref: `mockDoc(${col}/${id})` })),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn((q, callback) => {
    const fakeDocs = [
      { id: 'abc123', data: () => ({ naam: 'Januari 2025', omschrijving: 'Budget voor januari', eigenaarId: 'userX', gearchiveerd: false }) },
      { id: 'def456', data: () => ({ naam: 'Vakantie', omschrijving: 'Spaarplan vakantie', eigenaarId: 'userX', gearchiveerd: false }) },
    ];
    callback({ docs: fakeDocs });
    return jest.fn(); // unsubscribe function
  }),
  Timestamp: { now: () => 'mockTimestamp' },
}));

describe('Boekjes service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('voegt een boekje toe met correcte velden', async () => {
    await addBoekje('Januari 2025', 'Budget voor januari', 'user123');
    expect(addDoc).toHaveBeenCalledWith('mockCollection', {
      naam: 'Januari 2025',
      omschrijving: 'Budget voor januari',
      eigenaarId: 'user123',
      gearchiveerd: false,
      aangemaaktOp: 'mockTimestamp'
    });
  });

  it('archiveert een boekje op basis van id', async () => {
    await archiveerBoekje('abc123');
    expect(updateDoc).toHaveBeenCalledWith({ ref: 'mockDoc(boekjes/abc123)' }, { gearchiveerd: true });
  });

  it('herstelt een gearchiveerd boekje', async () => {
    await herstelBoekje('def456');
    expect(updateDoc).toHaveBeenCalledWith({ ref: 'mockDoc(boekjes/def456)' }, { gearchiveerd: false });
  });

  it('werkt naam en omschrijving van een boekje bij', async () => {
    await updateBoekje('abc123', 'Februari 2025', 'Budget bijgewerkt');
    expect(updateDoc).toHaveBeenCalledWith({ ref: 'mockDoc(boekjes/abc123)' }, {
    naam: 'Februari 2025',
    omschrijving: 'Budget bijgewerkt'
  });
  });

  it('activeert snapshot subscriber en roept callback aan met data', () => {
    const mockCallback = jest.fn();
    subscribeToBoekjes('userX', false, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith([
      { id: 'abc123', naam: 'Januari 2025', omschrijving: 'Budget voor januari', eigenaarId: 'userX', gearchiveerd: false },
      { id: 'def456', naam: 'Vakantie', omschrijving: 'Spaarplan vakantie', eigenaarId: 'userX', gearchiveerd: false }
    ]);
  });
});
