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
        if ($this->isEmpty()) {
            return;
        } elseif ($this->count() === 0) {
            return;
        } elseif ($this->count() === 1) {
            return;
        } elseif ($this->count() === 2) {
            $first = $this->shift();
            if (! $first instanceof \Mosolov\Datastructure\Node\ICompare) {
                $this->unshift($first);
                throw new \RuntimeException(self::EX_MSG_UNSORTABLE_NODE_DETECTED, self::EX_CODE_UNSORTABLE_NODE_DETECTED);
            }
            $second = $this->shift();
            if (! $second instanceof \Mosolov\Datastructure\Node\ICompare) {
                throw new \RuntimeException(self::EX_MSG_UNSORTABLE_NODE_DETECTED, self::EX_CODE_UNSORTABLE_NODE_DETECTED);
            }
            
            if ($first->isEqual($second)) {
                $this->unshift($second);
                $this->unshift($first);
                return;
            } elseif ($first->isGreaterThan($second)) {
                $this->unshift($second);
                $this->unshift($first);
                return;
            } else {
                $this->unshift($first);
                $this->unshift($second);
            }
        } else {
            return;
        }
        
    }
}
