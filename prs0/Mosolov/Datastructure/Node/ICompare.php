<?php

namespace Mosolov\Datastructure\Node;

/**
 * Compare two instances.
 *
 * @author denis
 */
interface ICompare {    
    public function isEqual(AbstractNodeValue $value); 
    public function isGreaterThan(AbstractNodeValue $value);
    public function isLessThan(AbstractNodeValue $value);
}
