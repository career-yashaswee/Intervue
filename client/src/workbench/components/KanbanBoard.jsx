"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GripVertical } from "lucide-react";

// Skeleton for loading state
const SkeletonContainer = () => (
  <Card className="w-full">
    <CardHeader>
      <Skeleton className="h-4 w-[250px]" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-[200px] mt-2" />
      <Skeleton className="h-4 w-[150px] mt-2" />
      <Skeleton className="h-4 w-[180px] mt-2" />
    </CardContent>
  </Card>
);

// Sortable Container component
const SortableContainer = ({ container, children, onAddItem }) => {
  const { setNodeRef, listeners, transform, transition, isDragging } =
    useSortable({
      id: container.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {container.title}
          </CardTitle>
          <Button size="sm" onClick={onAddItem}>
            Add Item
          </Button>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
      <div
        {...listeners}
        className="absolute top-2 left-2 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-gray-500" />
      </div>
    </motion.div>
  );
};

// Sortable Item component
const SortableItem = ({ item }) => {
  const { setNodeRef, listeners, transform, transition, isDragging } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      className="mb-2 last:mb-0 cursor-grab active:cursor-grabbing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardContent className="p-2">
          <p className="text-sm">{item.title}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function KanbanBoard() {
  const [containers, setContainers] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [currentContainerId, setCurrentContainerId] = useState();
  const [containerName, setContainerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setContainers([
        { id: uuidv4(), title: "To Do", items: [] },
        { id: uuidv4(), title: "In Progress", items: [] },
        { id: uuidv4(), title: "Done", items: [] },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = containers.find((c) =>
      c.items.some((item) => item.id === active.id)
    );
    const overContainer =
      containers.find((c) => c.id === over.id) ||
      containers.find((c) => c.items.some((item) => item.id === over.id));

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    setContainers((prev) => {
      const activeItems = activeContainer.items;
      const overItems = overContainer.items;

      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id === over.id);

      let newIndex;
      if (over.id === overContainer.id) {
        newIndex = overItems.length;
      } else {
        newIndex = overIndex >= 0 ? overIndex : overItems.length;
      }

      return prev.map((container) => {
        if (container.id === activeContainer.id) {
          return {
            ...container,
            items: container.items.filter((item) => item.id !== active.id),
          };
        }
        if (container.id === overContainer.id) {
          return {
            ...container,
            items: [
              ...container.items.slice(0, newIndex),
              activeItems[activeIndex],
              ...container.items.slice(newIndex),
            ],
          };
        }
        return container;
      });
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setContainers((containers) => {
        const oldIndex = containers.findIndex((c) => c.id === active.id);
        const newIndex = containers.findIndex((c) => c.id === over.id);

        return arrayMove(containers, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const onAddContainer = () => {
    if (!containerName) return;
    const newContainer = { id: uuidv4(), title: containerName, items: [] };
    setContainers([...containers, newContainer]);
    setContainerName("");
    setShowAddContainerModal(false);
  };

  const onAddItem = () => {
    if (!itemName || !currentContainerId) return;
    const newItem = { id: uuidv4(), title: itemName };
    setContainers(
      containers.map((container) =>
        container.id === currentContainerId
          ? { ...container, items: [...container.items, newItem] }
          : container
      )
    );
    setItemName("");
    setShowAddItemModal(false);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <SkeletonContainer />
        <SkeletonContainer />
        <SkeletonContainer />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <Dialog
          open={showAddContainerModal}
          onOpenChange={setShowAddContainerModal}
        >
          <DialogTrigger asChild>
            <Button>Add Column</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Column</DialogTitle>
            </DialogHeader>
            <Input
              value={containerName}
              onChange={(e) => setContainerName(e.target.value)}
              placeholder="Column Name"
            />
            <Button className="mt-2 w-full" onClick={onAddContainer}>
              Create
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={containers}
          strategy={horizontalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {containers.map((container) => (
              <SortableContainer
                key={container.id}
                container={container}
                onAddItem={() => {
                  setCurrentContainerId(container.id);
                  setShowAddItemModal(true);
                }}
              >
                <SortableContext
                  items={container.items}
                  strategy={verticalListSortingStrategy}
                >
                  {container.items.map((item) => (
                    <SortableItem key={item.id} item={item} />
                  ))}
                </SortableContext>
              </SortableContainer>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Dialog open={showAddItemModal} onOpenChange={setShowAddItemModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
          </DialogHeader>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
          />
          <Button className="mt-2 w-full" onClick={onAddItem}>
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
