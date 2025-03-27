import { SelectionModel } from '@angular/cdk/collections';
import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  untracked,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { useBrnColumnManager } from '@spartan-ng/brain/table';
import { debounceTime, map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _localStorageService = inject(LocalStorageService);

  protected readonly _rawFilterInput = signal('');
  protected readonly _taskFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );
  protected readonly _brnColumnManager = useBrnColumnManager({
    id: { visible: false, label: 'Id' },
    name: { visible: false, label: 'Product' },
    status: { visible: false, label: 'Status' },
  });
  protected readonly _allDisplayedColumns = computed(() => [
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  private readonly _displayedIndices = signal({ start: 0, end: 0 });

  private readonly _selectionModel = new SelectionModel<Task>(true);
  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(map((change) => change.source.selected)),
    {
      initialValue: [],
    }
  );

  private readonly _tasks = signal(TASK_DATA);

  public readonly _filteredTasks = computed(() => {
    let tasks = this._tasks();
    const taskFilter = this._taskFilter()?.trim()?.toLowerCase();

    // search filter
    if (taskFilter && taskFilter.length > 0) {
      tasks = tasks.filter(
        (a) =>
          a.name.toLowerCase().includes(taskFilter) ||
          a.id.toLowerCase().includes(taskFilter)
      );
    }
    return tasks;
  });
  protected readonly _filteredSortedPaginatedTasks = computed(() => {
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const tasks = this._filteredTasks();
    return [...tasks].slice(start, end);
  });

  constructor() {
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    effect(() => {
      const debouncedFilter = this._debouncedFilter();
      untracked(() => this._taskFilter.set(debouncedFilter ?? ''));
    });
    const columnSettings = this._localStorageService.getTaskTableColumns();
    for (const column of columnSettings) {
      this._brnColumnManager.setVisible(column as any);
    }
  }

  isTaskSelected(task: Task) {
    return this._selectionModel.isSelected(task);
  }

  toggleTask(task: Task) {
    this._selectionModel.toggle(task);
  }

  getColumnManager() {
    return this._brnColumnManager;
  }

  getTaskFilter() {
    return this._taskFilter;
  }

  getRawFilterInput() {
    return this._rawFilterInput;
  }

  getAllDisplayedColumns() {
    return this._allDisplayedColumns;
  }

  getSelected() {
    return this._selected;
  }

  setDisplayedIndices(startIndex: number, endIndex: number) {
    this._displayedIndices.set({ start: startIndex, end: endIndex });
  }
  getFilteredSortedPaginatedTasks() {
    return this._filteredSortedPaginatedTasks;
  }
}

export type TaskType = 'Bug' | 'Feature' | 'Documentation';
export type TaskStatus =
  | 'Todo'
  | 'In Progress'
  | 'Backlog'
  | 'Canceled'
  | 'Done';
export type TaskPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export type Task = {
  id: string;
  name: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
};

const TASK_DATA: Task[] = [
  {
    id: 'TASK-8782',
    name: "You can't compress the program without quantifying the open-source SSD",
    status: 'In Progress',
    priority: 'Low',
    type: 'Bug',
  },
  {
    id: 'TASK-7878',
    name: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
    status: 'Backlog',
    priority: 'Medium',
    type: 'Feature',
  },
  {
    id: 'TASK-7839',
    name: 'We need to bypass the neural TCP card!',
    status: 'Todo',
    priority: 'High',
    type: 'Documentation',
  },
  {
    id: 'TASK-5562',
    name: 'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
    status: 'Backlog',
    priority: 'Medium',
    type: 'Bug',
  },
  {
    id: 'TASK-8686',
    name: "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: 'Canceled',
    priority: 'Medium',
    type: 'Feature',
  },
  {
    id: 'TASK-1280',
    name: 'Use the digital TLS panel, then you can transmit the haptic system!',
    status: 'Done',
    priority: 'High',
    type: 'Documentation',
  },
  {
    id: 'TASK-7262',
    name: "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!",
    status: 'Done',
    priority: 'High',
    type: 'Bug',
  },
  {
    id: 'TASK-1138',
    name: "Transmitting the transmitter won't do anything, we need to compress the virtual HDD sensor!",
    status: 'In Progress',
    priority: 'Medium',
    type: 'Feature',
  },
  {
    id: 'TASK-7184',
    name: 'We need to program the back-end THX pixel!',
    status: 'Done',
    priority: 'Low',
    type: 'Documentation',
  },
  {
    id: 'TASK-5160',
    name: 'The SQL interface is down, override the optical bus so we can program the ASCII interface!',
    status: 'In Progress',
    priority: 'High',
    type: 'Bug',
  },
  {
    id: 'TASK-9001',
    name: 'Need to refactor the quantum blockchain to optimize the AI neural mesh',
    status: 'Todo',
    priority: 'High',
    type: 'Feature',
  },
  {
    id: 'TASK-9002',
    name: 'The IPv6 matrix is overflowing, debug the recursive GPU bandwidth',
    status: 'In Progress',
    priority: 'Medium',
    type: 'Documentation',
  },
  {
    id: 'TASK-9003',
    name: 'Deploy microservice containers to scale the holographic RAM interface',
    status: 'Backlog',
    priority: 'Low',
    type: 'Bug',
  },
  {
    id: 'TASK-9004',
    name: 'Synchronize the blockchain ledger with the quantum entangled cache',
    status: 'Todo',
    priority: 'High',
    type: 'Feature',
  },
  {
    id: 'TASK-9005',
    name: 'The machine learning pipeline is corrupting the serverless Docker nodes',
    status: 'In Progress',
    priority: 'High',
    type: 'Documentation',
  },
  {
    id: 'TASK-9006',
    name: "Implement zero-trust authentication for the neural network's REST API",
    status: 'Done',
    priority: 'Medium',
    type: 'Bug',
  },
  {
    id: 'TASK-9007',
    name: 'The distributed NoSQL cluster is fragmenting the WebAssembly heap',
    status: 'Backlog',
    priority: 'Low',
    type: 'Feature',
  },
  {
    id: 'TASK-9008',
    name: 'Need to recompile the quantum-resistant encryption module in WebGL',
    status: 'In Progress',
    priority: 'High',
    type: 'Documentation',
  },
  {
    id: 'TASK-9009',
    name: 'The edge computing mesh is destabilizing the blockchain consensus',
    status: 'Todo',
    priority: 'Medium',
    type: 'Bug',
  },
  {
    id: 'TASK-9010',
    name: "Optimize the neural network's deep learning tensor for Web3 integration",
    status: 'Canceled',
    priority: 'Low',
    type: 'Feature',
  },
  {
    id: 'TASK-9011',
    name: 'The quantum fuzzy logic parser is corrupting the blockchain NFTs',
    status: 'Todo',
    priority: 'High',
    type: 'Documentation',
  },
  {
    id: 'TASK-9012',
    name: 'Need to recompile the Metaverse VR modules using Web Assembly',
    status: 'In Progress',
    priority: 'Medium',
    type: 'Bug',
  },
  {
    id: 'TASK-1337',
    name: 'The AI is generating recursive blockchain smart contracts',
    status: 'Backlog',
    priority: 'Critical',
    type: 'Feature',
  },
  {
    id: 'TASK-9013',
    name: 'Optimize WASM compilation for metaverse sharding',
    status: 'Backlog',
    priority: 'High',
    type: 'Documentation',
  },
  {
    id: 'TASK-9014',
    name: 'Implement reactive blockchain state management',
    status: 'Done',
    priority: 'Medium',
    type: 'Bug',
  },
  {
    id: 'TASK-9015',
    name: 'Debug quantum decoherence in ML training pipeline',
    status: 'In Progress',
    priority: 'Critical',
    type: 'Feature',
  },
  {
    id: 'TASK-9016',
    name: 'Optimize GPU raytracing for NFT rendering',
    status: 'Todo',
    priority: 'Low',
    type: 'Documentation',
  },
  {
    id: 'TASK-9017',
    name: 'Implement zero-knowledge proofs for AI models',
    status: 'Backlog',
    priority: 'High',
    type: 'Bug',
  },
  {
    id: 'TASK-9018',
    name: 'Debug smart contract recursive overflow',
    status: 'In Progress',
    priority: 'Medium',
    type: 'Feature',
  },
  {
    id: 'TASK-9019',
    name: 'Optimize neural network for quantum supremacy',
    status: 'Done',
    priority: 'High',
    type: 'Documentation',
  },
  {
    id: 'TASK-9020',
    name: 'Implement distributed consensus for VR nodes',
    status: 'Todo',
    priority: 'Medium',
    type: 'Bug',
  },
  {
    id: 'TASK-9021',
    name: 'Debug quantum entanglement in cache layer',
    status: 'In Progress',
    priority: 'High',
    type: 'Feature',
  },
  {
    id: 'TASK-9022',
    name: 'Optimize CUDA cores for blockchain mining',
    status: 'Backlog',
    priority: 'Low',
    type: 'Documentation',
  },
  {
    id: 'TASK-9023',
    name: 'Implement neural cryptography for Web3',
    status: 'Done',
    priority: 'Medium',
    type: 'Bug',
  },
  {
    id: 'TASK-9024',
    name: 'Debug recursive smart contract calls',
    status: 'In Progress',
    priority: 'High',
    type: 'Feature',
  },
  {
    id: 'TASK-9025',
    name: 'Optimize quantum compiler for WASM',
    status: 'Todo',
    priority: 'Critical',
    type: 'Documentation',
  },
  {
    id: 'TASK-9026',
    name: 'Implement sharding for NFT marketplace',
    status: 'Backlog',
    priority: 'Medium',
    type: 'Bug',
  },
  {
    id: 'TASK-9027',
    name: 'Debug neural network race conditions',
    status: 'In Progress',
    priority: 'High',
    type: 'Feature',
  },
  {
    id: 'TASK-9028',
    name: 'Optimize GPU pipeline for metaverse rendering',
    status: 'Done',
    priority: 'Low',
    type: 'Documentation',
  },
  {
    id: 'TASK-9029',
    name: 'Implement quantum-safe cryptography',
    status: 'Todo',
    priority: 'High',
    type: 'Bug',
  },
  {
    id: 'TASK-9030',
    name: 'Debug distributed ledger consensus',
    status: 'In Progress',
    priority: 'Medium',
    type: 'Feature',
  },
  {
    id: 'TASK-9031',
    name: 'Optimize AI models for edge computing',
    status: 'Backlog',
    priority: 'High',
    type: 'Documentation',
  },
  {
    id: 'TASK-9032',
    name: 'Implement zero-day exploit detection',
    status: 'Done',
    priority: 'Critical',
    type: 'Bug',
  },
  {
    id: 'TASK-9033',
    name: 'Debug quantum teleportation protocol',
    status: 'In Progress',
    priority: 'Medium',
    type: 'Feature',
  },
  {
    id: 'TASK-9034',
    name: 'Optimize blockchain for IoT devices',
    status: 'Todo',
    priority: 'Low',
    type: 'Documentation',
  },
  {
    id: 'TASK-9035',
    name: 'Implement neural feedback loops',
    status: 'Backlog',
    priority: 'High',
    type: 'Bug',
  },
  {
    id: 'TASK-9036',
    name: 'Debug smart contract gas optimization',
    status: 'In Progress',
    priority: 'Medium',
    type: 'Feature',
  },
  {
    id: 'TASK-9037',
    name: 'Optimize quantum circuits for ML',
    status: 'Done',
    priority: 'High',
    type: 'Documentation',
  },
  {
    id: 'TASK-9038',
    name: 'Implement distributed VR rendering',
    status: 'Todo',
    priority: 'Low',
    type: 'Bug',
  },
  {
    id: 'TASK-9039',
    name: 'Debug neural network backpropagation',
    status: 'In Progress',
    priority: 'Critical',
    type: 'Feature',
  },
  {
    id: 'TASK-9040',
    name: 'Optimize WASM for blockchain validation',
    status: 'Backlog',
    priority: 'Medium',
    type: 'Documentation',
  },
  {
    id: 'TASK-9041',
    name: 'Implement quantum error correction',
    status: 'Done',
    priority: 'High',
    type: 'Bug',
  },
  {
    id: 'TASK-9042',
    name: 'Debug distributed cache coherency',
    status: 'In Progress',
    priority: 'Low',
    type: 'Feature',
  },
  {
    id: 'TASK-9043',
    name: 'Optimize neural network pruning',
    status: 'Todo',
    priority: 'Medium',
    type: 'Documentation',
  },
  {
    id: 'TASK-9044',
    name: 'Implement zero-trust blockchain',
    status: 'Backlog',
    priority: 'High',
    type: 'Bug',
  },
  {
    id: 'TASK-9045',
    name: 'Debug quantum state preparation',
    status: 'In Progress',
    priority: 'Critical',
    type: 'Feature',
  },
  {
    id: 'TASK-9046',
    name: 'Optimize GPU kernels for NFTs',
    status: 'Done',
    priority: 'Medium',
    type: 'Documentation',
  },
  {
    id: 'TASK-9047',
    name: 'Implement neural hardware acceleration',
    status: 'Todo',
    priority: 'Low',
    type: 'Bug',
  },
  {
    id: 'TASK-9048',
    name: 'Debug smart contract memory leaks',
    status: 'In Progress',
    priority: 'High',
    type: 'Feature',
  },
  {
    id: 'TASK-9049',
    name: 'Optimize quantum gate operations',
    status: 'Backlog',
    priority: 'Medium',
    type: 'Documentation',
  },
  {
    id: 'TASK-9050',
    name: 'Implement distributed ML training',
    status: 'Done',
    priority: 'Critical',
    type: 'Bug',
  },
];
