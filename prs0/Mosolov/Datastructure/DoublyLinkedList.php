<?php

namespace Mosolov\Datastructure;

/**
 * Added sort method to SplDoublyLinkedList
 *
 * @author denis
 */
class DoublyLinkedList extends \SplDoublyLinkedList {

    const EX_MSG_UNSORTABLE_NODE_DETECTED = 'List has elements which are not implements Mosolov\Datastructures\Node\ICompare.';
    const EX_CODE_UNSORTABLE_NODE_DETECTED = 1;
    
    /**
     * All node values must implement Mosolov\Datastructures\Node\ICompare
     */
    public function sort() {
        $heap = new Heap();
        try {
            while (! $this->isEmpty()) { // $this->valid() has no effect
                $heap->insert($this->shift());
            }
            while (! $heap->isEmpty()) { // BUT $this->valid() works fine here !
                $this->unshift($heap->extract());
            }
        } catch(\RuntimeException $e) {
            throw new \RuntimeException(self::EX_MSG_UNSORTABLE_NODE_DETECTED, self::EX_CODE_UNSORTABLE_NODE_DETECTED);
        }
    }
}
