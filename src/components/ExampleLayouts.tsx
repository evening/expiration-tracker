import React from 'react'

const ExampleLayouts = () => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div>
        <h3 className="underline decoration-gray-400">
          Fridge
        </h3>
        <ul className='list-none'>
          <li>Bread | 2022/09/01</li>
          <li>Eggs | 2022/10/15</li>
          <li>Cheese | 2022/11/12</li>
          <li>Milk | 2022/12/01</li>
          <li>Yogurt | 2023/01/01</li>
        </ul>
      </div>
      <div>
        <h3 className="underline decoration-gray-400">
          Freezer
        </h3>
        <ul className='list-none'>
          <li>Ice cream | 2022/09/01</li>
          <li>Frozen vegetables | 2022/10/15</li>
          <li>Frozen pizza | 2022/11/12</li>
          <li>Frozen berries | 2022/12/01</li>
          <li>Frozen shrimp | 2023/01/01</li>
        </ul>
      </div>
      <div>
        <h3 className="underline decoration-gray-400">Pantry</h3>
        <ul>
          <li>Bread | 2022/09/01</li>
          <li>Eggs | 2022/10/15</li>
          <li>Cheese | 2022/11/12</li>
          <li>Milk | 2022/12/01</li>
          <li>Yogurt | 2023/01/01</li>
        </ul>
      </div>
      {/* Tables */}
      <div>
        <h3 className="underline decoration-gray-400">Fridge</h3>
        <table className='table-auto mx-auto'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bread</td>
              <td>2022/09/01</td>
            </tr>
            <tr>
              <td>Eggs</td>
              <td>2022/10/15</td>
            </tr>
            <tr>
              <td>Cheese</td>
              <td>2022/11/12</td>
            </tr>
            <tr>
              <td>Milk</td>
              <td>2022/12/01</td>
            </tr>
            <tr>
              <td>Yogurt</td>
              <td>2023/01/01</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="underline decoration-gray-400">Freezer</h3>
        <table className='table-auto mx-auto'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ice cream</td>
              <td>2022/09/01</td>
            </tr>
            <tr>
              <td>Frozen vegetables</td>
              <td>2022/10/15</td>
            </tr>
            <tr>
              <td>Frozen pizza</td>
              <td>2022/11/12</td>
            </tr>
            <tr>
              <td>Frozen berries</td>
              <td>2022/12/01</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="underline decoration-gray-400">Pantry</h3>
        <table className='table-auto mx-auto'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bread</td>
              <td>2022/09/01</td>
            </tr>
            <tr>
              <td>Eggs</td>
              <td>2022/10/15</td>
            </tr>
            <tr>
              <td>Cheese</td>
              <td>2022/11/12</td>
            </tr>
            <tr>
              <td>Milk</td>
              <td>2022/12/01</td>
            </tr>
            <tr>
              <td>Yogurt</td>
              <td>2023/01/01</td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default ExampleLayouts
