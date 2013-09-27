<?php

namespace Mosolov\Datastructure;

/**
 * Description of Heap
 *
 * @author denis
 */
class Heap extends \SplHeap {
    
    const EX_MSG_UNSORTABLE_NODE = 'List has elements which are not implements Mosolov\Datastructures\Node\ICompare.';
    const EX_CODE_USORTABLE_NODE = 1;
    
    public function compare($value1, $value2) {
        if (! $value1 instanceof \Mosolov\Datastructure\Node\ICompare ||
            ! $value2 instanceof \Mosolov\Datastructure\Node\ICompare) {
            throw new \RuntimeException(self::EX_MSG_UNSORTABLE_NODE, self::EX_CODE_USORTABLE_NODE);
        }
        
        if ($value1->isEqual($value2)) {
            return 0;
        } else if ($value1->isGreaterThan($value2)) {
            return 1;
        } else {
            return -1;
        }
    }
}

?>
